import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientJsonpModule} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherService {
  appId: string;
  appCode: string;
 stad:any;
  weather: any;
  constructor(private _http: HttpClient) { 
    this.appId = "DemoAppId01082013GAL";
    this.appCode = "AJKnXv84fjrb0KIHawS0Tg";
    this.weather = [];
  }
  url:string = "https://api.openweathermap.org/data/2.5/forecast?q=";
  url2:string = "&appid=";
  apiToken:string= "49d029a72712a7be22e423e539c3daef";
  newUrl:string
  //https://api.openweathermap.org/data/2.5/forecast?q=
//   API call:
// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={your api key}
  dailyForecastCoordinates(coordinates: any){
    this.newUrl= "https://api.openweathermap.org/data/2.5/forecast?lat="+coordinates.latitude+"&lon="+ coordinates.longitude + "&cnt=5"+"&appid=a085e388a4845e3eaf8d654cf11a3b70"
    return this._http.get(this.newUrl).map(result => result);
  }

  dailyForecast(stad:any){
    this.newUrl=this.url + stad+ this.url2+this.apiToken;
    return this._http.get(this.newUrl).map(result => result);
  }
  getWeather(stad: any) {
   return this._http.jsonp("https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&name="+stad+ "&app_id=" + this.appId + "&app_code=" + this.appCode + "&language=dutch", "jsonpCallback")
    // this.http.jsonp("https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=" + coordinates.latitude + "&longitude=" + coordinates.longitude + "&app_id=" + this.appId + "&app_code=" + this.appCode + "&language=dutch", "jsonpCallback")
        .pipe(map(result => (<any>result).dailyForecasts.forecastLocation));
        
}
getWeatherCoordinates(coordinates: any) {
  return this._http.jsonp("https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude="+coordinates.latitude+"&longitude=" + coordinates.longitude + "&app_id=" + this.appId + "&app_code=" + this.appCode + "&language=dutch", "jsonpCallback")
    // this._http.jsonp("https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=" + coordinates.latitude + "&longitude=" + coordinates.longitude + "&app_id=" + this.appId + "&app_code=" + this.appCode + "&language=dutch", "jsonpCallback")
       .pipe(map(result => (<any>result).dailyForecasts.forecastLocation));     

      }
}
