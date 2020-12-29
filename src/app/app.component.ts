import { Component, Input, OnInit } from '@angular/core';
import {HttpClient, HttpParams } from '@angular/common/http';
import { map }from 'rxjs/operators';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  city: string;
  cityweather: string;
  country: string;
  errorMessage: string;
  @Input() inputCity: string;

  constructor(private http: HttpClient){
    this.inputCity = "Enter City";
  }


 ngOnInit() {
   this.fetchWeatherApi();
 } 

 fetchWeatherApi() {
   this.city = this.inputCity;

   this.cityweather = `Loading status for "${this.inputCity}"`;

   let searchParams = new HttpParams();
   searchParams = searchParams.set('q', `${this.city}` )
   searchParams = searchParams.set('appid', '<api-key>')

   this.http.get("http://api.openweathermap.org/data/2.5/weather", {
     params: searchParams
   })
 .pipe(map(responseData => {
   const postArrays = [] // observable
   for (const key in responseData) {
     if (responseData.hasOwnProperty(key)){
       postArrays.push({...responseData});
     }
    }
    this.cityweather = postArrays[0].weather[0].description;
    this.country = postArrays[0].sys.country;
    console.log('Display Weather ' + this.cityweather);
    console.log('Country ' + this.country);
    return postArrays[0];
  })).subscribe(data => {
    console.log(data);
  }, (error) => {
    console.error('City Not Found');
    this.cityweather = this.errorMessage;
  });
}
    
clearStatus() {
  this.inputCity = null;
  this.cityweather = 'Enter the city';
  this.country = null;
}
}