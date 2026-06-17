import { Component, OnInit, output } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { QuizService } from '../quiz-service/quiz';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.scss'],
  imports: [IonContent, IonButton]
})
export class EndScreenComponent  implements OnInit {

  changeState = output<string>();

  totalQuestions : number = 0;
  correctCount : number = 0;
  incorrectCount : number = 0;
  skippedCount : number = 0;

  constructor(public quizService : QuizService) { }

  async ngOnInit() {
    let stats = await this.quizService.getStats();
    this.correctCount = stats.correct;
    this.incorrectCount = stats.incorrect;
    this.skippedCount = stats.skipped;
    this.totalQuestions = stats.total;
  }

  async goBackClick() {
    await this.quizService.resetQuiz();
    this.changeState.emit("quiz_start");
  }
}
