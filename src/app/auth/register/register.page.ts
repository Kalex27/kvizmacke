import { RouterModule } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone'; //kao neki alert


import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AuthService } from '../auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    IonButton,
    RouterModule,
  ],
})
export class RegisterPage implements OnInit {
  authService: AuthService = inject(AuthService); //da bismo mogli da koristimo register

  toastCtrl = inject(ToastController);

  registerForm: FormGroup;

  constructor() {
    this.registerForm = new FormGroup({
      name: new FormControl('Mau', Validators.required),
      username: new FormControl('miomao123', Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  ngOnInit() {}

  async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000, //duzina u milisekundama
      color,
    });

    await toast.present(); //nakon sto se kreira prikazuje tost
  }

  onRegister() {
    console.log(this.registerForm);
    this.authService.register(this.registerForm.value).subscribe({
      next:(resData) => {  //subscribe da bismo procitali observable
        console.log('Registracija je uspesna!');
        console.log(resData);

      //////////////////////////

        this.authService //cuvamo i u realtime database
          .saveUserData(resData.localId, this.registerForm.value)
          .subscribe({
            next: async () => { //next - dobijen podatak i sad radimo nesto dalje 
              console.log('Podaci korisnika sacuvani');
              await this.showToast('Uspešna registracija!', 'success');
            },

            error: async (err) => { //error - nesto je puklo (tuzan mau)
              console.log(err);

              await this.showToast("Greska pri cuvanju korisnika!");
            }
         });
      },

      error: async (err) => {
        let message = 'Greška pri registraciji';

        if (err.error?.error?.message === 'EMAIL_EXISTS') { //da li ima error?ako ima da li on ima error? ako ima uzmi message
          message = 'Email već postoji';                    //pregazi poruku ako ima =^.,.^=
        } else if (err.error?.error?.message === 'WEAK_PASSWORD') {
          message = 'Lozinka mora imati minimum 6 karaktera';
        }
        await this.showToast(message);
      }

    }); 
  }

  
}