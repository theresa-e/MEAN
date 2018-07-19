import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CakesService {

  constructor(private _cakes: HttpClient) { }

  // Retrieve all cakes in database. 
  getCakes() {
    return this._cakes.get('/cakes');
  }

  // Create a new cake
  createCake(cake: any) {
    return this._cakes.post('/cakes', cake);
  }

  // Find cake info by ID
  findByID(id: string) {
    return this._cakes.get('/cakes/' + id);
  }


  // Rate cake by ID
  rateCake(id: string, ratingAndComment) {
    return this._cakes.post('/cakes/' + id, ratingAndComment);
  }
}
