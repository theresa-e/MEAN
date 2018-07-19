import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-seattle',
  templateUrl: './seattle.component.html',
  styleUrls: ['./seattle.component.css']
})
export class SeattleComponent implements OnInit {
  currentWeather: any;

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeather();
  }

  getWeather(){
    let observable = this._weatherService.getSeattle();
    observable.subscribe( res => {
      console.log('Response from API service: ', res);
      this.currentWeather = res;
    })
  } 
}
