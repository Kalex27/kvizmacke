import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

/*
  Baza je struktuirana na sledeci nacin (sto se tice pitanja)
  root je objekat:
  {
    questions:
    {
      q-hash: { question: 
                {
                  text: string,
                  answers: 
                  { [keys : string] : string // value je answerText }
                  
                  // keys je random hash koji cemo da vecinom da ignorisemo,
                  // ono sto je bitno je da ako odlucimo da budu uzastopni integeri,
                  // onda moraju tako svuda da budu, inace moze bilo kako
                  //
                  // ovo je zato sto firebase ne moze nativno da cuva arrayeve
                  // tako da ono sto rade je ako imamo uzastopne brojeve u kljucevima
                  // vracace array sa tim brojevima u indeksima, imao sam cudne momente
                  // gde uspe da vrati array i kad nisu uzastopni, tako da tu ide random
                  // hash, ili kao a0, a1, a2 itd. samo da ne budu cisti brojevi.
                  
                },
                solution: string (text tacnog odgovora)
              },
      ...
    },

    // ako bi radili sesije, moze login-om, a mogu i anonimne sesije
    // onda bi imali i deo koji je:
    user-sessions: 
    {
      // kreira se kad pocne kviz, obrise se kad se zavrsi kviz
      hash-sta-god-da-auth-radi: 
      {
        questions : { [key : string] : string }
        // key je hash pitanja, value je tekst odgovora na pitanje
        current_question : int
        // da li nam treba transakcija ako ovo treba da se azurira? Jer treba
        // da ucitamo i pitanje i da promenimo ovo o istom trosku
      }
    }
  }
*/

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  
  readonly dbPath : string = "https://kvizmacke-default-rtdb.europe-west1.firebasedatabase.app/";
  quiz = new Quiz();
  constructor(public http: HttpClient) {}

  async submitAnswer(ans : string) {
    return this.quiz.setAnswer(this.http, ans);
  }
  async getActiveSolution() : Promise<string | undefined> {
    let qHash = await this.quiz.getCurrentQHash(this.http);
    if (qHash) {
      let s = await Question.getSolution(this.http, qHash);
      return s;
    } else {
      return undefined;
    }
  }
  async getActiveQuestion() : Promise<Question | undefined> {
    let qHash = await this.quiz.getCurrentQHash(this.http);
    if (qHash) {
      let q = await Question.getQuestion(this.http, qHash);
      q.answers = Randomizer.shuffle(q.answers.length).map((i) => q.answers[i]);
      return q;
    } else {
      return undefined;
    }
  }

  seedQuestions(count_riba : number, count_sabiranje : number) : void {
    // sve je riba
    let zivotinje = ["krava", "macka", "pas", "riba", "gazela", "koza", "kit", "pastrmka",
      "medved", "kljunar", "pingvin", "lemur", "lav", "nilski konj", "krava 2",
    ]
    for(let i=0; i<count_riba; ++i) {
      let q = new Question(`${zivotinje[Math.floor(Math.random() * zivotinje.length)]} je :`,
                           { "1" : "riba",
                             "2" : "ne riba",
                             "3" : "kamen",
                             "4" : "djavol" });
      
      q.post(this.http, 0);
    }
    // sabiranje
    for (let i=0; i<count_sabiranje; ++i) {
      let a = Math.floor(Math.random() * 21);
      let b = Math.floor(Math.random() * 21);
      let q = new Question(`${a} + ${b} = ?`, [a+b, a+b+1, a+b-1, a+b+7].map((x) => x.toString()));
      q.post(this.http, 0);
    }
  }
}

class Question {
  answers : string[]
  constructor(public text : string, answers : { [key : string] : string } | string[]) {
    if (answers instanceof Array) {
      this.answers = answers
    } else {
      this.answers = [];
      for (const a in answers) {
        this.answers.push(answers[a]);
      }
    }
  }

  static async getHashes(http : HttpClient) : Promise<string[]> {
    let obj = await firstValueFrom(
      http.get<{ [key: string]: boolean }>(
      `${environment.dbPath}/questions.json?shallow=true`
    ));
    let r : string[] = [];
    for (let q in obj) {r.push(q)}
    return r;
  }
  static async getQuestion(http: HttpClient, qHash : string) : Promise<Question> {
    let obj = await firstValueFrom(
      http.get<{ text : string , answers : { [key : string] : string } }>(
        `${environment.dbPath}/questions/${qHash}/question.json`
      )
    );
    return new Question(obj.text, obj.answers);
  }
  static async getSolution(http: HttpClient, qHash : string) : Promise<string> {
    return await firstValueFrom(
      http.get<string>(
        `${environment.dbPath}/questions/${qHash}/solution.json`
      )
    )
  }
  static async getFullQuestion(http : HttpClient, qHash : string) : Promise<{question:Question, solution:string}> {
    let obj = await firstValueFrom(
      http.get<{question:{text:string, answers:{[keys:string]:string}}, solution:string}>(
        `${environment.dbPath}/questions/${qHash}.json`
      )
    );
    return {question: new Question(obj.question.text, obj.question.answers),
            solution:obj.solution};
  }
  post(http : HttpClient, correct_index: number) {
    correct_index = Math.floor(correct_index);
    if (correct_index >= this.answers.length || correct_index < 0) {
      correct_index = 0; // fallback
    }
    let postobj : { [ keys : string ] : any} = {}
    postobj['question'] = this.toJsonObject();
    postobj['solution'] = this.answers[correct_index];
    
    http.post<{ name : string }>(
      `${environment.dbPath}/questions.json`,
      postobj
    ).subscribe();
    //.subscribe((obj) => {console.log(obj.name)});
  }

  toJsonObject() : {text : string, answers : { [key : string] : string }} {
    let subobj : { [key : string] : string} = {}
    for (const a in this.answers) {
      subobj[`a${a}`] = this.answers[a];
    }
    return {text : this.text, answers : subobj};
  }
}

class Quiz {
  private questions : { hash : string, player_answer : string | undefined }[] = [];
  private currentQuestion : number = -1;

  constructor() {}

  // ako bi se prebacili na rad gde se sve ovo cuva u sesiji, buvkalno samo zamenimo
  // implementacije ovih funkcija...nadam se, ako nista kontam da ce pomoci tako da se pristupi

  getQuiz(http: HttpClient) : { questions: { hash:string, player_answer:string|undefined}[], current_question:number} {
    return {questions: this.questions, current_question: this.currentQuestion};
  }
  getCurrentQuestion(http: HttpClient) : number {
    return this.currentQuestion;
  }
  getCurrentQHash(http: HttpClient) : string | undefined {
    let qz = this.getQuiz(http);
    let cq : number = qz.current_question 
    return cq >= 0 ? qz.questions[cq].hash : undefined;
  }
  clear(http: HttpClient) : void {
    this.questions = [];
    this.currentQuestion = -1;
    // auth key?????
  }
// u bazu bi se slao null umesto undefined
  async loadQuestions(http: HttpClient, question_count: number) : Promise<void> {
    let hashes : string[] = await Question.getHashes(http);
    let picks = Randomizer.pickUpTo(question_count, hashes);
    this.questions = Randomizer.shuffle(picks.length)
      .map((i) => {return {hash: hashes[picks[i]],
                           player_answer: undefined}});
  }
  // boolean je za da li je tacno. Undefined je za "ne postoji u opcijama u bazi"
  async setAnswer(http: HttpClient, ans : string) : Promise<boolean | undefined> {
    let qz = this.getQuiz(http);
    let curQHash = qz.questions[qz.current_question].hash;
    let q = await Question.getFullQuestion(http, curQHash)
    if (!q.question.answers.includes(ans)) {
      return undefined;
    }
    // put/patch ... mislim da ide put
    this.questions[qz.current_question].player_answer = ans;
    return ans == q.solution;
  }
  nextQuestion(http: HttpClient) : string | undefined {
    return this.setCurrentQuestion(http, this.getCurrentQuestion(http) + 1);
  }
  setCurrentQuestion(http: HttpClient, i : number) : string | undefined {
    let qz = this.getQuiz(http);
    if (i >= qz.questions.length || i < 0) {
      return undefined;
    }
    this.currentQuestion = i;
    return qz.questions[i].hash;
  }
// randomizacija logika
}

class Randomizer {
  static pickUpTo(upTo: number, arr: any[]) : any[] {
    if (upTo >= arr.length) {
      return arr;
    }
    let res : any[] = [];
    let picks = new Set<number>();
    while (picks.size < upTo) {
      picks.add(Math.floor(Math.random() * arr.length));
    }
    // isto je da li pise keys ili values za skupove ...
    for (const q of picks.keys()) {
      res.push(q);
    }

    return res;
  }
  static shuffle(count : number) : number[] {
    let res : number[] = [];
    let indexes: Set<number> = new Set();
    for (let i=0; i<count; ++i) {
      indexes.add(i);
    }

    while (indexes.size > 0) {
      let rndSetIndex = Math.floor(Math.random() * indexes.size);
      let keys = indexes.keys();
      let nextIndex = keys.next().value ?? 0;
      for (let i=0; i<rndSetIndex; ++i) {
          nextIndex = keys.next().value ?? 0;
      }
      // undefined slucaj se ne moze desiti, ali mi trazi da ga navedem.
      // radi na praznom nizu odogovora i na jednoclanom nizu odgovora.
      // ako bude ispisivalo puno puta prvo pitanje, to je zato sto se ovde
      // nesto zbrljalo :(

      res.push(nextIndex);
      indexes.delete(nextIndex);
    }
    return res;
  }
}