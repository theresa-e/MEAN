import { Component, OnInit } from '@angular/core';
import { GoldService } from './gold.service';
import { observable } from '../../node_modules/rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  gold = 0;
  gameId;
  constructor(private _goldService: GoldService){}

  ngOnInit() {
    this.newGame();
  }

  // Create a new game
  newGame(): void {
    console.log('New game has started.');
    var newGame;
    let observable = this._goldService.newGame(newGame);
    observable.subscribe(res => {
      console.log('response: ', res)
      this.gold = res['gold'];
      this.gameId = res['_id'];
    }

//   goToFarm(): void{
//     let winnings: number = Math.floor((Math.random() * 20) + 10); // generate random number 10-20
//     // this.gold += winnings;
//     // this.messages.push(`You went to the farm and won ${winnings} gold!`);
//     // console.log('Farm winnings: ', winnings);
//     // console.log('messages', this.messages)
//   }

//   goToCave(): void{
//     let winnings: number = Math.floor((Math.random() * 10) + 5); // generate random number 5-10
//     this.gold += winnings;
//     this.messages.push(`You went to the cave and won ${winnings} gold!`);
//     console.log('Cave winnings: ', winnings);
//   }

//   goToHouse(): void{
//     let winnings: number = Math.floor((Math.random() * 5) + 2); // generate random number 2-5
//     this.gold += winnings;
//     this.messages.push(`You went to the house and won ${winnings} gold!`);
//     console.log('House winnings: ', winnings);
//   }

//   goToCasino(): void{
//     let winnings: number = Math.floor((Math.random() * -20) + 20); // generate random number -20 - 20
//     this.gold += winnings;
//     this.messages.push(`You went to the casino and came back with ${winnings} gold!`);
//     console.log('Casino winnings: ', winnings);
//   }

}
