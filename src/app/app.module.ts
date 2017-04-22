import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { ModalModule } from 'ng2-bootstrap/modal';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { AngularFireModule } from 'angularfire2';
import { LoginPageComponent } from './login-page/login-page.component';
import {RouterModule, Routes} from "@angular/router";
import {AF} from "../providers/af";
import { HomePageComponent } from './home-page/home-page.component';
import { NewsPageComponent } from './news-page/news-page.component';

import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CarMeetPageComponent } from './carmeet-page/carmeet-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { PrototypePageComponent } from './prototype-page/prototype-page.component';


import {FormsModule} from "@angular/forms";
import { AgmCoreModule } from 'angular2-google-maps/core';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import {Ng2PaginationModule} from 'ng2-pagination'; 
import { CollapseModule } from 'ng2-bootstrap/collapse';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {GooglePlaceModule} from "angular2-google-place";
import { MyDatePickerModule } from 'mydatepicker';
import { AlertModule } from 'ng2-bootstrap';




export const firebaseConfig = {
   apiKey: "AIzaSyCjhCvsNNjtrY2ne_7o1wo66DXUl6j69V8",
    authDomain: "logintest-a1285.firebaseapp.com",
    databaseURL: "https://logintest-a1285.firebaseio.com",
    storageBucket: "logintest-a1285.appspot.com",
    messagingSenderId: "1063706368103"
};

const routes: Routes = [
  { path: 'garage', component: HomePageComponent },
  { path: 'news', component: NewsPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'register', component: RegistrationPageComponent},
  { path: 'profile', component: ProfilePageComponent},
  { path: 'carmeet', component: CarMeetPageComponent},
  { path: 'about', component: AboutPageComponent},
      { path: 'prototype', component: PrototypePageComponent}


];

@NgModule({
  imports: [
    BrowserModule, 
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    FormsModule,
    Ng2FilterPipeModule,
    ModalModule.forRoot(), AlertModule.forRoot(),  NgbModule.forRoot(),
 NgbModule.forRoot(),
    DropdownModule.forRoot(),
    Ng2PaginationModule,
      CollapseModule.forRoot(), MyDatePickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBSsuGCcJkquSFREHSZI6J2FE5UvS0ueZM'
    }), 
      GooglePlaceModule,
      

  ],
  declarations: [ AppComponent, LoginPageComponent, HomePageComponent, RegistrationPageComponent, ProfilePageComponent, CarMeetPageComponent, NewsPageComponent, AboutPageComponent, PrototypePageComponent ],
  bootstrap: [ AppComponent ],
  providers: [AF]
})
export class AppModule {}
