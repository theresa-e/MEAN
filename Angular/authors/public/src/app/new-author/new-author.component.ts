import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../authors.service';
@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.css']
})
export class NewAuthorComponent implements OnInit {
  newAuthor: any;

  constructor(private _authorService: AuthorsService) { }

  ngOnInit() {
    this.newAuthor = { firstName: "", lastName: "" };
  }

  submitForm() {
    console.log('Creating new author: ', this.newAuthor);
    this.createAuthor(this.newAuthor);
  }

  createAuthor(author: any) {
    let observable = this._authorService.createAuthor(author);
    observable.subscribe( res => {
      console.log('Response from the service: ', res);
    })
  }
}
