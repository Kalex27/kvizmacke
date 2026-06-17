import { Component, OnInit, output } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/angular/standalone';
import { QuizService } from '../quiz-service/quiz';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
  imports: [IonContent, IonButton] 
})
export class StartScreenComponent {

  changeState = output<string>();

  constructor(public quizService : QuizService) { }

  async quizStartClick(qCount : number) {
    await this.quizService.initializeQuiz(qCount);
    this.changeState.emit("quiz_question");
  }

  importQClick() {
    this.changeState.emit("import_question");
  }
}
