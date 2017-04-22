import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild, Input} from '@angular/core';
import {AF} from "../../providers/af";
import {FirebaseListObservable, AngularFire} from "angularfire2";
 import {Observable} from 'rxjs/Rx';
 import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Router } from "@angular/router";
import { RouterModule } from '@angular/router';





@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],

})
export class HomePageComponent implements OnInit{
  public newUserCar: string;
  public newUserCarModel: string;
    public newUserCarSale: string;
    public newUserCarPrice: string;
  public newUserCarComment: string;
  public newUserCarLike: string;
      public newUserCarImage: string;
    public showId;
    public counter;
      public error: any;
public oldBrand: string;
    public oldModel: string;
    public oldSale: string;
    public oldPrice: string;

  public usercars: FirebaseListObservable<any[]>;
    public rusers: FirebaseListObservable<any[]>;
  public comments: FirebaseListObservable<any[]>;
    public uccomments: FirebaseListObservable<any[]>;
        public userlikedcars: FirebaseListObservable<any[]>;

    

userPosts: any[] = this.afService.usercars;
    aaaaaa: any[] = this.afService.userid;
    

  userPostsFilter: any = { brand: '', model: '', sale: '' };


  constructor(public afService: AF, private router: Router) {

    
    this.usercars = this.afService.usercars;
    this.comments = this.afService.comments;
              this.showId = false;
     

   
  }
    
    

       ngOnInit() {
  
}

    
               deleteUserCarComment(usercarCommentKey: string) {
        this.afService.deleteUserCarComment(usercarCommentKey);
      }  


    
       startedit(usercarBrand: string, usercarModel: string, usercarSale: string, usercarPrice:string)
    {
    this.oldBrand = usercarBrand;
    this.oldModel = usercarModel;
    this.oldSale = usercarSale;
    this.oldPrice = usercarPrice;
        console.log("t3:" + this.oldBrand + this.oldModel + this.oldSale + this.oldPrice)
    }
    
    
  sendUserCar(){  
    this.afService.sendUserCar(this.newUserCar, this.newUserCarModel, this.newUserCarSale, this.newUserCarPrice);
    this.newUserCar = '';
    this.newUserCarModel = '';
    this.newUserCarSale = '';
    this.newUserCarPrice = '';
   
  }
    
      sendUserCarComment(usercarKey: string){
    this.afService.sendUserCarComment(usercarKey, this.newUserCarComment);
    this.newUserCarComment = '';
  }
    
 
    
  deleteUserCar(usercarKey: string) {
        this.afService.deleteUserCar(usercarKey);
      }
    
     editUserCar(usercarKey: string, newUserCar, newUserCarModel, newUserCarSale, newUserCarPrice) {
        this.afService.editUserCar(usercarKey, newUserCar, newUserCarModel, newUserCarSale, newUserCarPrice);
       
      }
        
        //Like Car Function

        
             likeUserCar(usercarKey: string,  usercardisplayName: string, usercarBrand: string, usercarModel: string, usercarLikes: string, usercarImg: string, usercarSale: string, usercarPrice: String) {
            if(usercarKey!=null)
                {
                 this.afService.likeUserCar(usercarKey, usercardisplayName, usercarBrand, usercarModel, usercarLikes, usercarImg, usercarSale, usercarPrice);
                }   
      }
    
    
 
        //Sort By Function

 sortByBrand()
 {


 this.usercars = this.afService.af.database.list('usercars', {
  query: {
    orderByChild: 'brand'
    }
     
});
 }
    
  uncl(likedcarKey: string) {
  this.afService.uncl(likedcarKey);
   }
        
 sortByUser()
 {
 this.usercars = this.afService.af.database.list('usercars', {
  query: {
    orderByChild: 'displayName'
    }
});
 }
    
        
 sortByTime()
 {
 this.usercars = this.afService.af.database.list('usercars', {
  query: {
    orderByChild: 'timestamp'
    }
}).map((array) => array.reverse()) as FirebaseListObservable < any[] > ;
 }

     sortByLikes()
 {
 this.usercars = this.afService.af.database.list('usercars', {
  query: {
    orderByChild: 'likes'
    }
}).map((array) => array.reverse()) as FirebaseListObservable < any[] > ;
 }
    
         sortByPrice()
 {
 this.usercars = this.afService.af.database.list('usercars', {
  query: {
    orderByChild: 'price'
    }
}).map((array) => array.reverse()) as FirebaseListObservable < any[] > ;
 }
   
    
    commentClear()
    {
            this.newUserCarComment = '';

    }


 ngOnChanges() {
       
    }
    
    log(val) { console.log(val); }





       
    }

  

