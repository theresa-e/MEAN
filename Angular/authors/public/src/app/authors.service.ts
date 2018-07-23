import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private _authors: HttpClient) { }

  createAuthor(author: any){
    return this._authors.post('/authors', author)
  }
}
