import { Component, OnInit } from '@angular/core';
import { CakesService } from './cakes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  allCakes: any;
  newCake: any;
  cakeDetails: any;
  cakeDetailsRating: string;
  cakeComment: any = {text: ''};
  newRating: any = { value: 0 };
  ratingID: any;
  showForm: string;

  constructor(private _cakeService: CakesService) { }

  ngOnInit() {
    this.newCake = { name: "", bakersName: "", imageURL: "", rating: "" } // reset values
    this.cakeDetails = {}
    this.getCakes();
  }

  // Get all cakes
  getCakes(): void {
    let observable = this._cakeService.getCakes();
    observable.subscribe(res => {
      console.log('Get all cakes: ', res);
      this.allCakes = res['cakes'];
      this.calculateRating();
    })
    this._cakeService.getCakes();
  }

  // Create a new cake
  createCake(cake: any): void {
    console.log('Create cake form was submitted.')
    let observable = this._cakeService.createCake(this.newCake);
    observable.subscribe(res => {
      console.log('Response from service: ', res);
    });
    this.newCake = { name: "", bakersName: "", imageURL: "", rating: "" } // reset values
    this.getCakes();
  }

  // Get info on a specific cake
  getCakeInfo(id: string): void {
    console.log(id)
    let observable = this._cakeService.findByID(id);
    observable.subscribe(res => {
      console.log('Response from service findById: ', res);
      this.cakeDetails = res['cake'];
      this.calculateRating();
    });
    this.getCakes();
  }

  // Rate cake by the id. 
  createRatingAndComment(id: string): void {
    console.log(id)
    console.log(this.newRating)
    console.log(this.cakeComment)
    var commentRating = {rating: this.newRating, comment: this.cakeComment};
    console.log('comment rating', commentRating)
    let observable = this._cakeService.rateCake(id, commentRating);
    observable.subscribe(res => {
      console.log('Response from service: ', res);
    })
    this.getCakes();
  }

  showCommentRatingForm(id: string): void {
    console.log('Showing the form.');
    this.showForm = id;
  }
  // Calculate and set rating
  calculateRating(): void{
    var ratings = this.cakeDetails['ratings'];
    var sum = 0;
    var avg = 0;
    for (var i=0; i<ratings.length; i++){
      sum += parseInt(ratings[i]);
    }
    console.log('sum is: ', sum)
    var avg = sum / ratings.length
    this.cakeDetailsRating = avg.toFixed(2);
  }
}
