import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-chicago',
  templateUrl: './chicago.component.html',
  styleUrls: ['./chicago.component.css']
})
export class ChicagoComponent implements OnInit {
  currentWeather: any;

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeather();
  }

  getWeather(){
    let observable = this._weatherService.getChicago();
    observable.subscribe(res => {
      console.log('Response from API service: ', res);
      this.currentWeather = res;
    })
  }
}
