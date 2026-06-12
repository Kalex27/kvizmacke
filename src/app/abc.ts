import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AbcServiceNas {
  
  text: string = "mau";

  addO(slovo:string): string{
    this.text += slovo;
    return this.text;
  }
}
