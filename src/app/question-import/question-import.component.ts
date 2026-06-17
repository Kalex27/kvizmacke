import { Component, OnInit, output } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonInput} from '@ionic/angular/standalone';
import {FormsModule} from '@angular/forms';
import { QuizService } from '../quiz-service/quiz';

@Component({
  selector: 'app-question-import',
  templateUrl: './question-import.component.html',
  styleUrls: ['./question-import.component.scss'],
  imports: [IonContent, IonButton, IonList, IonItem, IonInput, FormsModule]
})
export class QuestionImportComponent  implements OnInit {

  changeState = output<string>();

  wrongAnswers : string[] = [];
  solution : string = "";
  questionText : string = "";

  constructor(public quizService : QuizService) {}

  ngOnInit() {}

  newWrong() {
    this.wrongAnswers.push("");
  }
  removeWrong() {
    this.wrongAnswers.pop();
  }
  acceptQuestion() {
    console.log(this.questionText);
    console.log(this.solution);
    console.log(this.wrongAnswers);
    this.quizService.submitQuestion(this.questionText, this.solution, this.wrongAnswers);
    this.questionText = "";
    this.solution = "";
    this.wrongAnswers = [];
  }
  goBack() {
    this.changeState.emit("quiz_start");
  }
}
