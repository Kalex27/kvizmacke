import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage), //uzmi HomePage iz toga sto si dobio
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },



  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.page').then(m => m.RegisterPage),
  },
  {
    path: 'log-in',
    loadComponent: () =>
      import('./auth/log-in/log-in.page').then(m => m.LogInPage),
  }

];
