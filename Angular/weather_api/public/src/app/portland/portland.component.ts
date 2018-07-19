import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-portland',
  templateUrl: './portland.component.html',
  styleUrls: ['./portland.component.css']
})
export class PortlandComponent implements OnInit {
  currentWeather: any;

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeather();
  }

  getWeather(){
    let observable = this._weatherService.getPortland();
    observable.subscribe(res => {
      console.log('Response from API service: ', res);
      this.currentWeather = res;
    })
  }
}
