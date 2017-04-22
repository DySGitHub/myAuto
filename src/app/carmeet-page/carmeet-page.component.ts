import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import {AF} from "../../providers/af";
import {FirebaseListObservable} from "angularfire2";
 import {Observable} from 'rxjs/Rx';
 import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'bootstrap/dist/css/bootstrap.css';



@Component({
  selector: 'app-carmeet-page',
  templateUrl: './carmeet-page.component.html',
  styleUrls: ['./carmeet-page.component.css']
})
export class CarMeetPageComponent implements OnInit {
 
  public newMeetStart: Date = new Date();
  public newMeetEnd: Date = new Date();
  public newMeetName: string;
  public newMeetCar: string;
  public address: string;
  public newMeetComment: string;
  public oldname: string;
  public oldcar: string;
  public oldaddress: string;
  public oldstart: string;
  public oldend: string;
  private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd.mm.yyyy',
    };
            public d: Date = new Date();

        private newMeetDate: Object = { date: { year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate() } };
    
     public carmeets: FirebaseListObservable<any[]>;
     public meetscomments: FirebaseListObservable<any[]>;


     meetPosts: any[] = this.afService.carmeets; //Used for Searching https://github.com/VadimDez/ng2-filter-pipe
    

  meetPostsFilter: any = { address: '', cartype: '', meetname: ''};

  constructor(public afService: AF) {
    this.carmeets = this.afService.carmeets;

       this.address = '';
    this.meetscomments = this.afService.meetscomments;

      
   

  }
    
    
    onKey(event: any) { 
    this.address = '';
    this.address += event.target.value;
  }
    
    
      ngOnInit() {
          
  
}
    
   public isCollapsed:boolean = true;
 
  public collapsed(event:any):void {
    console.log(event);
  }
 
  public expanded(event:any):void {
    console.log(event);
  }
    
  
    //Add A Car Meet to System
    sendMeet(){
    this.afService.sendMeet(this.newMeetName, this.newMeetCar, this.address, this.newMeetStart, this.newMeetEnd, this.newMeetDate);
    this.newMeetName = '';
    this.newMeetCar = '';
    this.address = '';
    this.newMeetStart = this.d;
    this.newMeetEnd = this.d;
    this.newMeetDate = '';

  }
    
    
        //Delete Meet & Comment

      deleteMeet(carmeetKey: string) {
        this.afService.deleteMeet(carmeetKey);
      }
    
           deleteMeetComment(carmeetCommentKey: string) {
        this.afService.deleteMeetComment(carmeetCommentKey);
      }  

    
    
       startedit(newMeetName: string, newMeetCar: string, address: string, newMeetStart: string, newMeetEnd: string)
    {
    this.oldname = newMeetName; 
    this.oldcar = newMeetCar; 
    this.oldaddress = address; 
    this.oldstart = newMeetStart; 
    this.oldend = newMeetEnd; 
    
   
        console.log("t1:" + this.oldname + this.oldcar + this.oldaddress + this.oldstart + this.oldend)
    }
    
    
        //Edit a Car Meet in System

    
         editMeet(carmeetKey: string, newMeetName: string, newMeetCar: string, address: string, newMeetStart: string, newMeetEnd: string) {
    this.afService.editMeet(carmeetKey, newMeetName, newMeetCar, this.address, newMeetStart, newMeetEnd, this.newMeetDate);
    this.address = '';
    this.newMeetDate = '';
      }
    
        //Sending Comment
    
            sendMeetComment(carmeetKey: string){
    this.afService.sendMeetComment(carmeetKey, this.newMeetComment);
    this.newMeetComment = '';
  }
    
        //Clear Comment
    
        commentClear()
    {
            this.newMeetComment = '';

    }
  
 
}
