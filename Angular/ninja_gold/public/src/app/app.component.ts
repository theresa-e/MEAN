import { Component, OnInit } from '@angular/core';
import { GoldService } from './gold.service';
import { observable } from '../../node_modules/rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  gold = 0;
  gameId;
  constructor(private _goldService: GoldService) { }

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
    });
  }
}