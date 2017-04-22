import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import {AF} from "../../providers/af";
import {FirebaseListObservable} from "angularfire2";
 import {Observable} from 'rxjs/Rx';
 import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'bootstrap/dist/css/bootstrap.css';



@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
 
  

  constructor(public afService: AF) {

  }
    
   

    
      ngOnInit() {
         
  
}

 
}
