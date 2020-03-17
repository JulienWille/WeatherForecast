import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
 import {MatSelectModule} from '@angular/material/select';
 import { ReactiveFormsModule } from '@angular/forms';
 import {MatAutocompleteModule} from '@angular/material/autocomplete';
 import {MatInputModule} from '@angular/material/input';


 import {WeatherService} from './weather.service';
 import { HttpClientModule, HttpHeaders, HttpClientJsonpModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MomentPipe } from './moment.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    BodyComponent,
    MomentPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    NoopAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatInputModule,
    HttpClientJsonpModule
    ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
