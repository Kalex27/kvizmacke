import { Component, Inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { AbcServiceNas } from '../abc';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  text = "abc";
  mau:string;
  //some_var: Observable<{ name: string }>;

  onkliktanje():void{
    console.log(this.mau);
    this.text += 'o';
    console.log
  }

  constructor(public abcService: AbcServiceNas)
  {
    this.mau = this.abcService.text;
    //this.some_var = this.abcService.postmau();
    //this.some_var.subscribe((res) => {console.log(res)});
  }
  
  addO(sl:string): void {
    this.abcService.addO(sl);
    this.mau = this.abcService.text;
    
  }

  unsub(): void {
    this.abcService.getmau().subscribe((a: any) => {console.log(a)});
  }
}
