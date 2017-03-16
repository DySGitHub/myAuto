import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild, Input} from '@angular/core';
import {AF} from "../../providers/af";
import {FirebaseListObservable, AngularFire} from "angularfire2";
import {OrderBy} from "./orderBy"
 import {Observable} from 'rxjs/Rx';
 import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import * as firebase2 from 'firebase';

declare var firebase2: any;


interface Image {
    path: string;
    filename: string;
    downloadURL?: string;
    $key?: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit/*,AfterViewChecked*/ {
  //@ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public newUserCar: string;
  public newUserCarModel: string;
      public newUserCarImage: string;
    public showId;
    public showId2;

  public usercars: FirebaseListObservable<any[]>;
  

  constructor(public afService: AF) {
    this.usercars = this.afService.usercars;
        this.showId = false;
              this.showId2 = false;


  }
    
     toggleId() {
    this.showId = !this.showId;
  }
    
     toggleId2() {
    this.showId2 = !this.showId2;
  }

  ngOnInit() {
      
  }

  /*ngAfterViewChecked() {
    this.scrollToBottom();
  }*/

  /*scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }*/

  sendUserCar(){
    this.afService.sendUserCar(this.newUserCar, this.newUserCarModel);
    this.newUserCar = '';
    this.newUserCarModel = '';
  }
    
  deleteUserCar(usercarKey: string) {
        this.afService.deleteUserCar(usercarKey);
      }
    
     editUserCar(usercarKey: string) {
        this.afService.editUserCar(usercarKey, this.newUserCar, this.newUserCarModel);
          this.newUserCar = '';
    this.newUserCarModel = '';
      }
    
    
  

 /* isYou(email) {
    if(email == this.afService.email)
      return true;
    else
      return false;
  }

  isMe(email) {
    if(email == this.afService.email)
      return false;
    else
      return true;
  }*/


 ngOnChanges() {
       
    }




       
    }
   /* deleteimage(image: Image) {
                this.afService.deleteimage(image);

    }*/

