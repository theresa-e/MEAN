import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GoldService {
  constructor(private _gold: HttpClient) {
   }

   newGame(gold: any){
     return this._gold.post('/gold', gold);
   }
}
