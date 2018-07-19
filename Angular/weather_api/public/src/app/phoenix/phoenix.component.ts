import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-phoenix',
  templateUrl: './phoenix.component.html',
  styleUrls: ['./phoenix.component.css']
})
export class PhoenixComponent implements OnInit {
  currentWeather: any;

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeather();
  }

  getWeather(){
    let observable = this._weatherService.getWashington();
    observable.subscribe(res => {
      console.log('Response from API service: ', res);
      this.currentWeather = res;
    })
  }
}
