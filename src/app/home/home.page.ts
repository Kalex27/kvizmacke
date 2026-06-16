import { Component, Inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { QuizService } from '../quiz-service/quiz';
import { StartScreenComponent } from '../start-screen/start-screen.component';
import { QuestionComponent } from '../question/question.component';
import { EndScreenComponent } from '../end-screen/end-screen.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, StartScreenComponent, QuestionComponent, EndScreenComponent],
})
export class HomePage {
  constructor()
  {}
}
