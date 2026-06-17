import { Component, OnInit, input, output } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/angular/standalone';
import { QuizService } from '../quiz-service/quiz';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  imports: [IonContent, IonButton]
})
export class QuestionComponent implements OnInit {

  changeState = output<string>();

  qNo : number = -1;
  qCountTotal : number = -1;
  questionText : string = "";
  answers : string[] = [];
  answered : boolean = false;
  correctness : { [key : string] : boolean}  = {};
  responseText = "";
  constructor(public quizService: QuizService) { }

  async initialize() {
    let q = await this.quizService.getActiveQuestion();
    let quiz = await this.quizService.getQuiz();
    if (q) {
      this.questionText = q.text;
      this.answers = q.answers;
      this.answered = false;
      this.correctness = {};
      this.responseText = "";
      this.qNo = quiz.current_question + 1;
      this.qCountTotal = quiz.questions.length;
    } else {
      console.log(q);
    }
  }

  async ngOnInit() {
    await this.initialize();
  }

  async submitAnswer(ans: string) {
    if (this.answered) {
      return;
    }
    let r = await this.quizService.submitAnswer(ans);
    if (r === undefined) {
      console.log("Poslali smo nemoguce u bazu");
      return;
    }
    let s = await this.quizService.getActiveSolution();
    if (s === undefined) {
      console.log("Odgovorili smo nemoguce.");
      return;
    } else {
      this.answers.forEach((a) => {this.correctness[a] = a === s});
      this.answered = true;
      this.responseText = `${ans} - ${ans === s ? "Tacno" : "Netacno"}`
    }
  }

  async giveUpClick() {
    await this.quizService.resetQuiz();
    this.changeState.emit("quiz_start");
  }

  async nextClick() {
    let nextExists = await this.quizService.nextQuestion();
    if (nextExists) {
      this.initialize();
    } else {
      this.changeState.emit("quiz_end");
    }
  }
}


