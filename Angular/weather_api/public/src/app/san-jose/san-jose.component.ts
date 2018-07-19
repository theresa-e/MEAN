import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-san-jose',
  templateUrl: './san-jose.component.html',
  styleUrls: ['./san-jose.component.css']
})
export class SanJoseComponent implements OnInit {
  currentWeather: any; 
  
  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeather();
  }

  getWeather(){
    let observable = this._weatherService.getSanJose();
    observable.subscribe(res => {
      console.log('Response from API service: ', res);
      this.currentWeather = res;
    })
  }
}
