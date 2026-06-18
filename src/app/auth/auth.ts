import { BehaviorSubject } from 'rxjs'; //!!!! da bi cuvali trenutno ulogovanog korisnika!!!


import { HttpClient } from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import { environment } from 'src/environments/environment';

export interface AuthResponseData{
    idToken: string;
    email: string;
    refreshToken: string;
    localId: string;
    expiresIn: string;
    registered?: boolean;
}

export interface UserData{
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface CurrentUser {
  id: string;
  email: string;
  name?: string;
  username?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    private _isUserAuthenticated = false;
    http: HttpClient = inject(HttpClient)

    private _currentUser = new BehaviorSubject<CurrentUser | null>(null); //trenutno ulogovani korisnik


    constructor(){}

    get isUserAuthenticated(): boolean{
        return this._isUserAuthenticated;
    }

    saveUserData(uid: string, user: UserData) { //zato sto cu u bazi cuvati jos podataka osim samo email i passworda (i id-a)
        return this.http.put(
            `https://kvizmacke-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`,
            {
                name: user.name,
                username: user.username,
                email: user.email
            }
        );
    }

    register(user: UserData){
        this._isUserAuthenticated = true;
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
            {
                email: user.email, 
                password: user.password, 
                returnSecureToken: true
            },
        );
    }

    logIn(user: UserData){
        this._isUserAuthenticated = true;
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
            {email: user.email, password: user.password, returnSecureToken: true},
        );
    }

    get currentUser() {
        return this._currentUser.asObservable();
    }

    setCurrentUser(user: CurrentUser) {
        this._currentUser.next(user);
        //localStorage.setItem('user', JSON.stringify(user)); //ostaje ulogovan i nakon refresh-a TREBA i u Auth da se doda ali me mrzi sada
    }

    getUserData(uid: string) {
        return this.http.get<CurrentUser>(
            `https://kvizmacke-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
        );
    }

    logOut(){
        this._currentUser.next(null);
        localStorage.removeItem('user');
        this._isUserAuthenticated = false;
    }

}