import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

  constructor(private _http: HttpClient) { }
  url:string = "https://api.openweathermap.org/data/2.5/forecast?q=";
  url2:string = "&appid=";
  apiToken:string= "49d029a72712a7be22e423e539c3daef";
  newUrl:string

  dailyForecast(stad:any){
    this.newUrl=this.url + stad+this.url2+this.apiToken;
    return this._http.get(this.newUrl).map(result => result);
  }
}
