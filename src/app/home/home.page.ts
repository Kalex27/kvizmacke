import { Component, Inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { AbcServiceNas } from '../abc';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  text = "abc";
  mau:string;

  onkliktanje():void{
    console.log(this.mau);
    this.text += 'o';
    console.log
  }

  constructor(public abcService: AbcServiceNas)
  {
    this.mau = this.abcService.text;
  }
  
  addO(sl:string): void {
    this.abcService.addO(sl);
    this.mau = this.abcService.text;
  }
}
