import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { Component, inject, OnInit, output } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, ModalController, 
  IonFabButton, IonFab} from '@ionic/angular/standalone';
import { QuizService } from '../quiz-service/quiz';
import { addIcons } from 'ionicons';
import { paw } from 'ionicons/icons';
import { AuthService } from '../auth/auth';


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
  imports: [IonContent, IonButton, IonButtons,IonIcon, IonFabButton, IonFab, RouterModule, CommonModule ] 
})
export class StartScreenComponent {

  changeState = output<string>();

  modalCtrl: ModalController = inject(ModalController);

  authService = inject(AuthService); //da prikaze trenutno ulogovanog korisnika
  currentUser = this.authService.currentUser;
  

  constructor(public quizService : QuizService) {
      addIcons({ paw });
   }

  async quizStartClick(qCount : number) {
    await this.quizService.initializeQuiz(qCount);
    this.changeState.emit("quiz_question");
  }

  importQClick() {
    this.changeState.emit("question_list");
  }

  
  logout() {
    this.authService.logOut();
  }
  
  async openModal(){
    this.changeState.emit("leki-galery");
  }
  

}
