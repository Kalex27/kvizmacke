import { RouterModule } from '@angular/router';

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonTitle,
  IonToolbar,
  LoadingController,
  AlertController,
} from '@ionic/angular/standalone';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonRow,
    IonCol,
    IonGrid,
    IonInputPasswordToggle,
    IonLabel,
    RouterModule,
  ],
})
export class LogInPage implements OnInit {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  loadingCtrl: LoadingController = inject(LoadingController);
  alertCtrl: AlertController = inject(AlertController);

  constructor() {}

  ngOnInit() {}

  async onLogIn(logInForm: NgForm) {
    console.log(logInForm);
    if(logInForm.valid){
      this.authService.logIn();
      this.router.navigateByUrl('/home');
    }
  }
}
