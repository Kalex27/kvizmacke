import { Component, OnInit, output } from '@angular/core';
import {IonButton, IonContent} from '@ionic/angular/standalone';

@Component({
  selector: 'app-leki-galery',
  templateUrl: './leki-galery.component.html',
  styleUrls: ['./leki-galery.component.scss'],
  imports: [IonButton, IonContent]

})
export class LekiGaleryComponent  implements OnInit {

  changeState = output<string>();

  constructor() { }

  ngOnInit() {}

  back() {
    this.changeState.emit('quiz_start');
  }

  downloadImage(imagePath: string, fileName: string) {
    const link = document.createElement('a');
    link.href = imagePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
