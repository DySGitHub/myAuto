import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { LoginPageComponent } from './login-page/login-page.component';
import {RouterModule, Routes} from "@angular/router";
import {AF} from "../providers/af";
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';


import {FormsModule} from "@angular/forms";
import { RegistrationPageComponent } from './registration-page/registration-page.component';

export const firebaseConfig = {
   apiKey: "AIzaSyCjhCvsNNjtrY2ne_7o1wo66DXUl6j69V8",
    authDomain: "logintest-a1285.firebaseapp.com",
    databaseURL: "https://logintest-a1285.firebaseio.com",
    storageBucket: "logintest-a1285.appspot.com",
    messagingSenderId: "1063706368103"
};

const routes: Routes = [
  { path: 'garage', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'register', component: RegistrationPageComponent},
      { path: 'profile', component: ProfilePageComponent}

];

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    FormsModule
  ],
  declarations: [ AppComponent, LoginPageComponent, HomePageComponent, RegistrationPageComponent, ProfilePageComponent ],
  bootstrap: [ AppComponent ],
  providers: [AF]
})
export class AppModule {}
