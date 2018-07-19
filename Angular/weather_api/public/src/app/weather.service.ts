import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _weather: HttpClient) { }

  getSeattle(){
    return this._weather.get('http://api.openweathermap.org/data/2.5/weather?q=seattle&APPID=f40f882dc9eda9c00551595b9952ce25');
  }

  getSanJose(){
    return this._weather.get('http://api.openweathermap.org/data/2.5/weather?q=san%20jose&APPID=f40f882dc9eda9c00551595b9952ce25');
  }

  getChicago(){
    return this._weather.get('http://api.openweathermap.org/data/2.5/weather?q=chicago&APPID=f40f882dc9eda9c00551595b9952ce25');
  }

  getPortland(){
    return this._weather.get('http://api.openweathermap.org/data/2.5/weather?q=portland&APPID=f40f882dc9eda9c00551595b9952ce25');
  }

  getWashington(){
    return this._weather.get('http://api.openweathermap.org/data/2.5/weather?q=district%20of%20columbia&APPID=f40f882dc9eda9c00551595b9952ce25');
  }

  getPhoenix(){
    return this._weather.get('http://api.openweathermap.org/data/2.5/weather?q=phoenix&APPID=f40f882dc9eda9c00551595b9952ce25');
  }
}
