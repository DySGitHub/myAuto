import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import {AF} from "../../providers/af";
import {FirebaseListObservable} from "angularfire2";
 import {Observable} from 'rxjs/Rx';
 import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';



@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit/*,AfterViewChecked*/ {
  //@ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public newUserCar: string;
    public newUserCarModel: string;
  public usercars: FirebaseListObservable<any[]>;

  constructor(public afService: AF) {
    this.usercars = this.afService.usercars;
  }

  ngOnInit() {}

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
}
