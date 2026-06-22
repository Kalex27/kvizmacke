import { Component, OnInit, output, Output } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonInput} from '@ionic/angular/standalone';
import { QuizService } from '../quiz-service/quiz';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
  imports: [IonContent, IonButton, IonList, IonItem, IonInput]
})
export class QuestionListComponent  implements OnInit {

  changeState = output<string>();

  questionList: string[] = [];
  reviewQuestion = output<string>();

  constructor(public quizService : QuizService) { }

  async ngOnInit() {
    this.questionList = await this.quizService.listqHashes();
  }

  questionClick(qHash : string){
    //console.log(qHash)
    this.reviewQuestion.emit(qHash);
  }

  
  giveUp(){
    this.changeState.emit("quiz_start");
  }

  importQuestion(){
    this.changeState.emit("import_question");
  }
}
