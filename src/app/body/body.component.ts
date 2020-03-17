import { Observable, empty } from 'rxjs';
import cities from "../../assets/cities.json";
import { WeatherService } from '../weather.service';
import { Chart } from 'chart.js'


import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray, Form } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { startWith, map } from 'rxjs/operators';
import { ResourceLoader, FunctionExpr, analyzeAndValidateNgModules } from '@angular/compiler';


export interface Stad {
  name: string;
}

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})


export class BodyComponent {
  title = 'Project-WeatherForecast';

  @ViewChild('canvas') canvas: any;

  ctx: CanvasRenderingContext2D;

  chart: any;
  test: any;

  constructor(private _weather: WeatherService, private elementRef: ElementRef) { this.steden = cities; }
  steden: Stad[]; // Array met alle steden in België
  filteredSteden: Observable<Stad[]>; // Array met alle steden in België gefilterd

  locatieControl = new FormControl("", Validators.required);
  locatieValue: any; //waarde van geselecteerde locatie


  stedenInladen(stad: Stad) {
    console.log(stad.name)

  }



  /**
   *  @description toont de huidige geselecteerde stad in selectieveld
  * @param stad
  * @return naam van geselecteerde stad
  */
  displayLocatie = stad =>{
    // this.InladenStad();
    console.log(stad)
    if (stad != undefined)
    {
      this.InladenStad(stad)
      return (stad && stad.name) ? stad.name : stad.name;
      
      // this.test = this.stedenInladen.bind(this);
  // console.log(this.test)
    }
    else
      return "";
  }

  /**
    * @description filteren steden
    * @param name naam van stad
    * @return een array met geselecteerde steden
    */
  private _filter(name: string): Stad[] {
    const filterValue = name.toLowerCase();

    return this.steden.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );

  }

  /**
   * @description veranderen value huidige geselecteerde locatie
   * @param event$
   */

  onSelectionChangedLocatie($event) {
    console.log($event)
    this.locatieValue = $event.option.value.name;

  }

   InladenStad(stad) {
    

    
    console.log(stad.name);

   

    this._weather.dailyForecast(stad.name).subscribe(res => {
      console.log(res)
      let temp_max = res['list'].map(res => res.main.temp_max-273.56)//0 Kelvin = -273.56 graden celsius
      // let temp_min = res['list'].map(res => res.main.temp_min)
      let AllDates = res['list'].map(res => res.dt)
      
      
      let weatherDates = []
      AllDates.forEach((res) => {
        let jsdate = new Date(res * 1000)
        weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
      })

      console.log(weatherDates);

      let x = document.getElementById("canvas");
    //   if (x){
    //     var y = (<HTMLCanvasElement>x).getContext('2d');
    //     y.clearRect(0,0, y.canvas.width, y.canvas.height);
    // }
    
      console.log(document.getElementById("canvas"))
      this.ctx = (<HTMLCanvasElement>x).getContext('2d');

// Use the identity matrix while clearing the canvas
// this.ctx.beginPath();
// this.ctx.clearRect(0, 0, (<HTMLCanvasElement>x).width, (<HTMLCanvasElement>x).height);

      this.chart = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: weatherDates,
          datasets: [
            {
              data: temp_max,
              borderColor: 'lightblue',
              fill: false
            }
            
            
            //,
            // {
            //   data: temp_min,
            //   borderColor: '#ffcc00',
            //   fill: false
            // }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              type: "time",
                    time: {
                      unit: "hour",
                      displayFormats: {
                        hour: "DD/M/YYYY H:mm"
                      },
                      tooltipFormat: "MMM. DD @ hA"
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "Date/Time"
                    }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Temperature (°C)"
              },
              ticks: {
                callback: function(value, index, values) {
                  return value + "°C";
                }
              }
            }]
          },
        }
      })
    });


  }

  ngOnInit() {
    /**
         * @description filteren steden op naam
         */
    this.filteredSteden = this.locatieControl.valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.steden.slice()))
    );

    
  }

}
