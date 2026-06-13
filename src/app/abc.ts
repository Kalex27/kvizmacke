import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AbcServiceNas {
  
  text: string = "mau";

  constructor(private http: HttpClient) {}

  addO(slovo:string): string{
    this.text += slovo;
    return this.text;
  }

  postmau() {
    return this.http.post<{ name: string }>(
      `https://kvizmacke-default-rtdb.europe-west1.firebasedatabase.app/test.json`,
      { "miu" : "mau" },
    );
  }

  getmau() {
    return this.http.get<{ [key: string]: any }>(
      `https://kvizmacke-default-rtdb.europe-west1.firebasedatabase.app/test/-Ov1QNMREvzVgDSA7FXF.json`
    ).pipe()
  }
}
