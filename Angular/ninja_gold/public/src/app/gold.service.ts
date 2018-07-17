import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GoldService {
  constructor(private _gold: HttpClient) {
   }

   createNewGame(gold: any){
     const observable = this._gold.post('/gold', gold);
     observable.subscribe(res => console.log('New game created: ', res));
   }
}
