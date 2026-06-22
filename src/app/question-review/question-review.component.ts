import { Component, input, OnInit, output } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonInput} from '@ionic/angular/standalone';
import { QuizService } from '../quiz-service/quiz';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-question-review',
  templateUrl: './question-review.component.html',
  styleUrls: ['./question-review.component.scss'],
  imports: [IonContent, IonButton, IonList, IonItem, IonInput, FormsModule]
})
export class QuestionReviewComponent  implements OnInit {

  changeState = output<string>();

  qHash = input.required<string>()
  qText: string = "";
  correctAnswer: string = "";
  wrongAnswers: string[] = [];

  constructor(public quizService : QuizService) { }

  async ngOnInit() {
    let q = await this.quizService.getFullQ(this.qHash());
    console.log(q); 
    this.qText = q.question.text;
    this.correctAnswer = q.solution;
    this.wrongAnswers = q.question.answers.filter((a) => a!==q.solution)
  }

   newWrong() {
    this.wrongAnswers.push("");
  }
  removeWrong() {
    this.wrongAnswers.pop();
  }

  giveUp(){
    this.changeState.emit("question_list");
  }

  async delete(){
    await this.quizService.deleteQ(this.qHash());
    this.changeState.emit("question_list");
  }

  async updateQuestion(){
    await this.quizService.updateQuestion(this.qHash(),this.qText, this.correctAnswer, this.wrongAnswers);
    this.changeState.emit("question_list");
  }
}
