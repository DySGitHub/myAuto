import {Component, NgModule, ApplicationRef, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import {AF} from "../../providers/af";
import {FirebaseListObservable} from "angularfire2";
 import {Observable} from 'rxjs/Rx';
 import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from 'angular2-google-maps/core';




@Component({
  selector: 'app-prototype-page',
  templateUrl: './prototype-page.component.html',
  styleUrls: ['./prototype-page.component.css']
})
export class PrototypePageComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;
  

  constructor(public afService: AF) {

  }

    
      ngOnInit() {
         
  
}
    
}
 

