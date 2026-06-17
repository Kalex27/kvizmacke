import { RouterModule } from '@angular/router';

import { Component, inject, OnInit, output } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, ModalController, 
  IonFabButton, IonFab} from '@ionic/angular/standalone';
import { QuizService } from '../quiz-service/quiz';
import { addIcons } from 'ionicons';
import { paw } from 'ionicons/icons';


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
  imports: [IonContent, IonButton, IonButtons,IonIcon, IonFabButton, IonFab, RouterModule] 
})
export class StartScreenComponent {

  changeState = output<string>();

  modalCtrl: ModalController = inject(ModalController);

  constructor(public quizService : QuizService) {
      addIcons({ paw });
   }

  async quizStartClick(qCount : number) {
    await this.quizService.initializeQuiz(qCount);
    this.changeState.emit("quiz_question");
  }

  importQClick() {
    this.changeState.emit("import_question");
  }

  async openModal(){
    
  }
}
