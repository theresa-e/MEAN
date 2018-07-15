import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    let tempObservable = this._http.get('/tasks');
    tempObservable.subscribe(res => console.log("Got our tasks:, res"));
   }
}
