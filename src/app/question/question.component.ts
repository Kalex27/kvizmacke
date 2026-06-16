import { Component, OnInit, input } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/angular/standalone';
import { QuizService } from '../quiz-service/quiz';
import {NgClass} from '@angular/common';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  imports: [IonContent, IonButton, NgClass]
})
export class QuestionComponent implements OnInit {

  questionText : string = "";
  answers : string[] = [];
  answered : boolean = false;
  correctness : { [key : string] : boolean}  = {};
  responseText = "";
  constructor(public quizService: QuizService) { }

  async ngOnInit() {
    await this.quizService.quiz.loadQuestions(this.quizService.http, 3);
    await this.quizService.quiz.nextQuestion(this.quizService.http);
    let q = await this.quizService.getActiveQuestion();
    if (q) {
      this.questionText = q.text;
      this.answers = q.answers;
      this.answered = false;
      this.correctness = {};
      this.responseText = "";
    } else {
      console.log(q);
    }
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
}


