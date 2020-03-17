import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Chart } from 'chart.js'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Project-WeatherForecast';

  // @ViewChild('canvas') canvas: any;

  // ctx: CanvasRenderingContext2D;

  // chart: any;

  constructor(private _weather: WeatherService, private elementRef: ElementRef) { }


  ngOnInit() {
    // this._weather.dailyForecast("Kortrijk")
    //   .subscribe(res => {

    //     console.log(res)
    //     let temp_max = res['list'].map(res => res.main.temp_max)
    //     let temp_min = res['list'].map(res => res.main.temp_min)
    //     let AllDates = res['list'].map(res => res.dt)

    //     let weatherDates = []
    //     AllDates.forEach((res) => {
    //       let jsdate = new Date(res * 1000)
    //       weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));

    //     })
    //     console.log(weatherDates);
    //     let x=document.getElementById("canvas");
    //     console.log(document.getElementById("canvas"))
    //     this.ctx = (<HTMLCanvasElement>x).getContext('2d');

    //     console.log(this.ctx)
    //     this.chart = new Chart(this.ctx, {
    //       type: 'line',
    //       data: {
    //         labels: weatherDates,
    //         datasets: [
    //           {
    //             data: temp_max,
    //             borderColor: '#3cba9f',
    //             fill: false
    //           },
    //           {
    //             data: temp_min,
    //             borderColor: '#ffcc00',
    //             fill: false
    //           }
    //         ]
    //       },
    //       options: {
    //         legend: {
    //           display: false
    //         },
    //         scales: {
    //           xAxes: [{
    //             display: true
    //           }],
    //           yAxes: [{
    //             display: true
    //           }]
    //         }
    //       }
    //     })
    //   });
  }
}
