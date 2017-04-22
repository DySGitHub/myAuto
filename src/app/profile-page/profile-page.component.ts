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
export class ProfilePageComponent implements OnInit {
  public newUserCar: string;
    public newUserCarModel: string;
    public newUserCarComment: string;
  public usercars: FirebaseListObservable<any[]>;
    public comments: FirebaseListObservable<any[]>;

    public userlikedcars: FirebaseListObservable<any[]>;
    public oldBrand: string;
    
    public oldModel: string;
    public oldSale: string;
    public oldPrice: string;
  public isCollapsed:boolean = true;

    

  constructor(public afService: AF) {
    this.usercars = this.afService.usercars;
    this.comments = this.afService.comments;
 
  }

  ngOnInit() {}


    
        
       startedit(usercarBrand: string, usercarModel: string, usercarSale: string, usercarPrice:string)
    {
    this.oldBrand = usercarBrand;
    this.oldModel = usercarModel;
    this.oldSale = usercarSale;
    this.oldPrice = usercarPrice;
        console.log("t3:" + this.oldBrand + this.oldModel + this.oldSale + this.oldPrice)
    }
    
public collapsed(event:any):void {
    console.log(event);
  }
 
  public expanded(event:any):void {
    console.log(event);
  }
    
        
  deleteUserCar(usercarKey: string) {
        this.afService.deleteUserCar(usercarKey);
      }
    
     editUserCar(usercarKey: string, newUserCar, newUserCarModel, newUserCarSale, newUserCarPrice) {
        this.afService.editUserCar(usercarKey, newUserCar, newUserCarModel, newUserCarSale, newUserCarPrice);
       
      }
    
        //Load Liked Cars Function

    loadlikedcars()
         {
         this.userlikedcars = this.afService.af.database.list('registeredUsers/' + this.afService.userid + '/LikedCars/', {
    query: {
    }}).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
          }
    
    
        //Unlike Car Function

               uncl(likedcarKey: string) {
           
                 this.afService.uncl(likedcarKey);
                
                
        
      }
    
    
         sendUserCarComment(usercarKey: string){
    this.afService.sendUserCarComment(usercarKey, this.newUserCarComment);
    this.newUserCarComment = '';
  }
    
    
    commentClear()
    {
            this.newUserCarComment = '';

    }
    
               deleteUserCarComment(usercarCommentKey: string) {
        this.afService.deleteUserCarComment(usercarCommentKey);
      }  

}
