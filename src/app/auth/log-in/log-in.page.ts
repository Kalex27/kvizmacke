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
  ToastController, 
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

  toastCtrl = inject(ToastController);

  constructor() {}

  ngOnInit() {}

  async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
    });

    await toast.present();
  }

  async onLogIn(logInForm: NgForm) {
    console.log(logInForm);

    const loadingEl = await this.loadingCtrl.create({ //you spin me right round baby right round
      message: 'Prijava u toku...',
      spinner: 'lines',
    });

    await loadingEl.present();

    if(logInForm.valid){
      this.authService.logIn(logInForm.value).subscribe({
        
        next:(resData) =>{
          console.log("Uspesna prijava")

          const uid = resData.localId; //uzima id uspesno prijavljenog korisnika
          
          this.authService.getUserData(uid).subscribe(userData => {

            const currentUser = {
              id: uid,
              email: resData.email,
              name: userData.name,
              username: userData.username,
            };

            this.authService.setCurrentUser(currentUser);

            loadingEl.dismiss(); //zatvara spiner
            this.router.navigateByUrl('/home');
          });

          //console.log(resData)
          //loadingEl.dismiss(); //zatvara spiner
          //this.router.navigateByUrl('/home');
        },

        error: async (err) => {
          let message = 'Neispravni email ili password';
          console.error(err);
          loadingEl.dismiss();

          await this.showToast(message);

          logInForm.reset();
        },
      });
      
    }
  }
}
