import { Injectable, Input} from "@angular/core";
import { Router} from '@angular/router';
import {    AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable}
from 'angularfire2';
import { FirebaseObjectFactoryOpts} from "angularfire2/interfaces";
import { Observable}
from 'rxjs';
import * as firebase1 from 'firebase';
import "rxjs/add/operator/map";
import { BehaviorSubject}
from 'rxjs';



declare var firebase1: any;



@ Injectable() export class AF {
    public usercars: FirebaseListObservable < any > ;
    public userlikedcars: FirebaseListObservable < any > ;

    public usercarscomments: FirebaseListObservable < any > ;
    public carmeets: FirebaseListObservable < any > ;
    public news: FirebaseListObservable < any > ;
    public usercarsprofile: FirebaseListObservable < any > ;
    public comments: FirebaseListObservable < any > ;
    public newscomments: FirebaseListObservable < any > ;
    public meetscomments: FirebaseListObservable < any > ;


    public users: FirebaseListObservable < any > ;
    public displayName: string;
    public email: string;
    public limit;

    public userid: string;
    public admin: string;
    public registereduser: FirebaseObjectObservable < any > ;

    public usercar: FirebaseObjectObservable < any > ;@
    Input() folder: string;




    constructor(public af: AngularFire) {
        this.af.auth.subscribe(
            (auth) => {
                if (auth != null) {
                    this.registereduser = this.af.database.object('registeredUsers/' + auth.uid);
                }
            }
        );








        this.usercars = this.af.database.list('usercars', {
            query: {
                orderByChild: 'timestamp'
            }
        }).map((array) => array.reverse()) as FirebaseListObservable < any[] > ;

        this.carmeets = this.af.database.list('carmeets', {
            query: {
                orderByChild: 'timestamp'
            }
        }).map((array) => array.reverse()) as FirebaseListObservable < any[] > ;


        this.news = this.af.database.list('news', {
            query: {
                orderByChild: 'timestamp'
            }
        }).map((array) => array.reverse()) as FirebaseListObservable < any[] > ;








        this.comments = this.af.database.list('comments', {
            query: {
                orderByChild: 'timestamp'
            }

        }).map((array) => array.reverse()) as FirebaseListObservable < any[] > ;


        this.newscomments = this.af.database.list('newscomments', {
            query: {
                orderByChild: 'timestamp'
            }

        }).map((array) => array.reverse()) as FirebaseListObservable < any[] > ;

        this.meetscomments = this.af.database.list('meetscomments', {
            query: {
                orderByChild: 'timestamp'
            }

        }).map((array) => array.reverse()) as FirebaseListObservable < any[] > ;



        this.usercarscomments = this.af.database.list('usercars/comments', {
            query: {
                orderByChild: 'timestamp'
            }
        }).map((array) => array.reverse()) as FirebaseListObservable < any[] > ;



        this.users = this.af.database.list('registeredUsers');



    }

    /*
     Logs in the user
     */
    loginWithGoogle() {
        return this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup,
        });

    }


    /*
     Logs out the current user
     */
    logout() {
        return this.af.auth.logout();

    }




   
    addUserInfo() {
        //We saved their auth info now save the rest to the db.
         this.users.update(this.userid, {
            email: this.email,
            displayName: this.displayName,
            userid: this.userid,
                    }); 
      
    }

    /*
      Saves user car to the Firebase Realtime Database
     */
    sendUserCar(text, text2, text3, text4) {
           

        let storageRef = firebase1.storage().ref();
        let storage = firebase1.storage();
        for (let selectedFile of[( < HTMLInputElement > document.getElementById('file')).files[0]]) {
            console.log(selectedFile);
            let af = this.af;
            let path = `usercars/${selectedFile.name}` + Date.now();
            var iRef = storageRef.child(path);
            iRef.put(selectedFile).then((snapshot) => {
                console.log('Uploaded a blob or file! Now storing the reference at', path);
                let storageRef2 = firebase1.storage().ref().child(path);
                var imageURL = snapshot.downloadURL;
                console.log("value of image is: " + imageURL);
                if (text3=="Not Open to Offers")
                    {
                        text4 = 0;
                    }
            
                console.log(text+text2+text3+text4)
               var usercar = {
                    brand: text,
                    model: text2,
                    sale: text3,
                    price: text4,
                    displayName: this.displayName,
                    likes: 0,
                    showcomment: false,
                    url: imageURL,
                    userid: this.userid,
                    email: this.email,
                    timestamp: Date.now(),
                };
                this.usercars.push(usercar); 

                

            });


        }
    }









    sendNews(text1, text2, text3) {
        let storageRef = firebase1.storage().ref();
        let storage = firebase1.storage();
        for (let selectedFile of[( < HTMLInputElement > document.getElementById('file')).files[0]]) {
            console.log(selectedFile);
        
            let af = this.af;
            let path = `news/${selectedFile.name}` + Date.now();
            var iRef = storageRef.child(path);
            iRef.put(selectedFile).then((snapshot) => {
                console.log('Uploaded a blob or file! Now storing the reference at', path);
                let storageRef2 = firebase1.storage().ref().child(path);
                var imageURL = snapshot.downloadURL;
                console.log("value of image is: " + imageURL);

                var newsitem = {
                    category: text1,
                    subject: text2,
                    content: text3,
                    displayName: this.displayName,
                    url: imageURL,
                    userid: this.userid,
                    email: this.email,
                    timestamp: Date.now(),
                };
                this.news.push(newsitem);

                if (text1 == '' && text2 == '' && text3 == '' && imageURL == '') {
                    alert("Please Enter All the Relevant Fields");

                }

            });


        }
    }









    sendUserCarComment(usercarKey: string, text1) {

        if (text1 == null) {
            alert("Please Enter A Comment");

        } else {
            var usercarcomment = {
                comment: text1,
                postid: usercarKey,
                displayName: this.displayName,
                userid: this.userid,
                email: this.email,
                timestamp: Date.now(),
            };
            const comment = this.af.database.list('comments');

            comment.push(usercarcomment);
        }
    }



    sendNewsItemComment(newsitemKey: string, text1) {

        if (text1 == null) {
            alert("Please Enter A Comment");

        } else {
            var newsitemcomment = {
                comment: text1,
                postid: newsitemKey,
                displayName: this.displayName,
                userid: this.userid,
                email: this.email,
                timestamp: Date.now(),
            };
            const newscomment = this.af.database.list('newscomments');

            newscomment.push(newsitemcomment);
        }
    }


    sendMeetComment(carmeetKey: string, text1) {

        if (text1 == null) {
            alert("Please Enter A Comment");

        } else {
            var meetcomment = {
                comment: text1,
                postid: carmeetKey,
                displayName: this.displayName,
                userid: this.userid,
                email: this.email,
                timestamp: Date.now(),
            };
            const meetscomments = this.af.database.list('meetscomments');

            meetscomments.push(meetcomment);
        }
    }




    sendMeet(text1, text2, text3, text4, text5, text6) {
        if (text1 != '' && text2 != '' && text3 != '' && text4 != ''  && text5 != '' && text6 != '') {
            var carmeet = {
                meetname: text1,
                cartype: text2,
                address: text3,
                starttime: text4,
                endtime: text5,
                meetdate: text6,
                show: false,
                showcomment: false,
                displayName: this.displayName,
                email: this.email,
                timestamp: Date.now(),
            };
            const carmeets = this.af.database.list('carmeets');

            carmeets.push(carmeet);
        } else {
                    alert("Please Enter All the Relevant Fields");
        }



    }


    editMeet(carmeetKey: string, text1, text2, text3, text4, text5, text6) {

        const items = this.af.database.list('carmeets');
        items.update(carmeetKey, {
             meetname: text1,
                cartype: text2,
            address: text3,
            starttime: text4,
            endtime: text5,
            meetdate: text6
        });
    }


    editNewsItem(newsitemKey: string, newNewsCategory: string, newNewsSubject: string, newNewsContent: string) {

        console.log(newsitemKey + newNewsCategory + newNewsSubject + newNewsContent);
        const items = this.af.database.list('news');
        items.update(newsitemKey, {
            category: newNewsCategory,
            subject: newNewsSubject,
            content: newNewsContent
        });
    }




    deleteUserCar(usercarKey: string) {

        const items = this.af.database.list('usercars');
        items.remove(usercarKey);
    }

 deleteUserCarComment(usercarCommentKey: string) {

        const items = this.af.database.list('comments');
        items.remove(usercarCommentKey);
    }

    deleteMeet(carmeetKey: string) {

        const items = this.af.database.list('carmeets');
        items.remove(carmeetKey);
    }

 deleteMeetComment(carmeetCommentKey: string) {

        const items = this.af.database.list('meetscomments');
        items.remove(carmeetCommentKey);
    }

    deleteNewsItem(useritemKey: string) {

        const items = this.af.database.list('news');
        items.remove(useritemKey);
    }

 deleteNewsComment(newsCommentKey: string) {

        const items = this.af.database.list('newscomments');
        items.remove(newsCommentKey);
    }



    editUserCar(usercarKey: string, text, text2, text3, text4) {
        if (text3=="Not Open to Offers")
                    {
                        text4 = 0;
                    }
        const items = this.af.database.list('usercars');
        items.update(usercarKey, {
            brand: text,
            model: text2,
            sale: text3,
            price: text4
        });
    }






    likeUserCar(usercarKey: string, usercardisplayName: string, usercarBrand: string, usercarModel: string, usercarLikes: string, usercarImg: string, usercarSale: string, usercarPrice: String) {
     
        var ruserKey = this.userid;
        const items = this.af.database.list('usercars');
                const ruser = this.af.database.list('registeredUsers/' + ruserKey + '/LikedCars/');

        console.log("ppppp:" + usercarKey + " " + ruserKey + " " + usercarPrice);

        
        
       let JJ = this.af.database.object('registeredUsers/' + ruserKey + '/LikedCars/' + usercarKey)
            .subscribe(LikedCar => {
                var test = LikedCar.brand;
                console.log("soz: " + test); 
            
            
             if (test==null)
            {
             var like = 1 + usercarLikes;
                    console.log("Size:" + like + ruserKey + "AAAAAAA: " + this.userid);
                    items.update(usercarKey, {
                        likes: like
                    });
                    ruser.update(usercarKey, {
                        likes: usercarKey,
                        model: usercarModel,
                        brand: usercarBrand,
                        displayName: usercardisplayName,
                        url: usercarImg,
                        sale: usercarSale,
                        price: usercarPrice
                    }); 
        
            }
            else
            {
                console.log("PlsStop");
                  JJ.unsubscribe();
            }
            
           
           
            })
       
                        

            
    }








  uncl(likedcarKey: string) {
   
        var ruserKey = this.userid;
        const items = this.af.database.list('usercars');
              const ruser = this.af.database.list('registeredUsers/' + ruserKey + '/LikedCars/');

  let AA = this.af.database.object('usercars/' + likedcarKey).subscribe(UCar => {
                var usercarlikes = UCar.likes;
                console.log("fffffffffffffap: " + usercarlikes); 
      
         let BB = this.af.database.object('registeredUsers/' + ruserKey + '/LikedCars/' + likedcarKey).subscribe(LikedCar => {
                var test1 = LikedCar.brand;
              var test2 = LikedCar.$key;
                console.log("Test: " + test1 + test2); 
            
            
           
                 console.log("LikeCarKey:" +likedcarKey);
                 if (test1!=null && test2!=null)
            {
                   var like = usercarlikes - 1;
         
                 ruser.remove(likedcarKey);  
                
                   items.update(likedcarKey, {
                        likes: like
                    });
                   
            
            }
                   else
                       {
                           console.log("Stop")
                                      BB.unsubscribe();
       

                       }
        
            })
            
            
            })
  
  
     AA.unsubscribe();


  



    }


    /* 
    Used to Register User
     */
    registerUser(email, password) {
        console.log(email)
        return this.af.auth.createUser({
            email: email,
            password: password,
        });


    }

    /*
     Save User Info
     */
    saveUserInfoFromForm(uid, name, email) {
        return this.af.database.object('registeredUsers/' + uid).set({
            userid: uid,
            name: name,
            email: email,

        });
    }


    /*
    Logs the user in using their Email/Password combo https://github.com/angular/angularfire2/blob/master/docs/5-user-authentication.md
     */
    loginWithEmail(email, password) {

        return this.af.auth.login({
            email: email,
            password: password,
        }, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password,
        });
    }

   





}
