import { Component, Inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { AbcServiceNas } from '../abc';
import { QuizService } from '../quiz-service/quiz';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  text = "abc";
  mau:string = "mau";
  //some_var: Observable<{ name: string }>;

  onkliktanje():void{
    console.log(this.mau);
    this.text += 'o';
    console.log
  }

  constructor(public quiz: QuizService)
  {
    //this.mau = this.abcService.text;
    //this.some_var = this.abcService.postmau();
    //this.some_var.subscribe((res) => {console.log(res)});
  }
  
  async addO(sl:string) {
    //this.abcService.addO(sl);
    //this.mau = this.abcService.text;
    //console.log(await this.quiz.getQuizHashes(4));
  }

  unsub(): void {
    //this.abcService.getmau().subscribe((a: any) => {console.log(a)});
    //this.quiz.seedQuestions(4, 3)
  }
}
