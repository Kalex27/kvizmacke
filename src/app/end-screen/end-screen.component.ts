import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.scss'],
  imports: [IonContent, IonButton]
})
export class EndScreenComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
