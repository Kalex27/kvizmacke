import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/angular/standalone';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
  imports: [IonContent, IonButton] 
})
export class StartScreenComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
