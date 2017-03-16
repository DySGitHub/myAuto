import {Injectable, Input} from "@angular/core";
import { Router } from '@angular/router';

import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";
import { Observable } from 'rxjs';
import * as firebase1 from 'firebase';
import "rxjs/add/operator/map";
import { BehaviorSubject } from 'rxjs';


declare var firebase1: any;



@Injectable()
export class AF {
  public usercars: FirebaseListObservable<any>;
public usercarsprofile: FirebaseListObservable<any>;

  public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;
  public limit;

  public userid: string;
public user: FirebaseObjectObservable<any>;
public registereduser: FirebaseObjectObservable<any>;

public usercar: FirebaseObjectObservable<any>;
@Input() folder: string; 
    

    

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.database.object('users/' + auth.uid);
          this.registereduser = this.af.database.object('registeredUsers/' + auth.uid);

            
        }
      });
      


      
    this.usercars = this.af.database.list('usercars', {
    query: {
        orderByChild: 'timestamp'
    }
}).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    
    
    this.users = this.af.database.list('users');

      
  }

  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });

  }

  /**
   * Logs out the current user
   */
  logout() {
    return this.af.auth.logout();
      
  }

  /**
   *
   */
  addUserInfo(){
    //We saved their auth info now save the rest to the db.
    this.users.push({
      email: this.email,
      displayName: this.displayName,
        userid: this.userid,
    });
  }

  /**
   * Saves user car to the Firebase Realtime Database
   * @param text
   */
  sendUserCar(text,text2) {
        let storageRef = firebase1.storage().ref();
      let storage = firebase1.storage();
        // This currently only grabs item 0, TODO refactor it to grab them all
        for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
            console.log(selectedFile);
            // Make local copies of services because "this" will be clobbered
            //let router = this.af.router;
            let af = this.af;
            let path = `/${selectedFile.name}`+Date.now();
            var iRef = storageRef.child(path);
            iRef.put(selectedFile).then((snapshot) => {
                console.log('Uploaded a blob or file! Now storing the reference at', path);
                let storageRef2 = firebase1.storage().ref().child(path);
                var imageURL = snapshot.downloadURL;

                
                console.log("value of image is: " + imageURL);


                
     var usercar = {
        brand: text,
        model: text2,
      displayName: this.displayName,
         url: imageURL,
         userid: this.userid,
      email: this.email,
      timestamp: Date.now(),
    };
    this.usercars.push(usercar);            
           
            });

            //var pathReference = storageRef.downloadURL;                         
}  
  }



deleteUserCar(usercarKey: string) {
  
  const items = this.af.database.list('usercars');
  items.remove(usercarKey);
}
 
 
 editUserCar(usercarKey: string, text, text2) {
  
  const items = this.af.database.list('usercars');
     items.update(usercarKey, {
            brand: text, model: text2
          });}

  /**
   *
   * @param model
   * @returns {firebase.Promise<void>}
   */
  registerUser(email, password) {
    console.log(email)
    return this.af.auth.createUser({
      email: email,
      password: password,
    });


  }

  /**
   *
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
  saveUserInfoFromForm(uid, name, email) {
    return this.af.database.object('registeredUsers/' + uid).set({
    userid : uid,
      name: name,
      email: email,

    });
  }


  /**
   * Logs the user in using their Email/Password combo
   * @param email
   * @param password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithEmail(email, password) {

    return this.af.auth.login({
        email: email,
        password: password,
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }

//***********************************************************************************************************************8
 





   /* deleteimage(image: Image) {
                firebase = this.af.database;

        let storagePath = image.path;
        let referencePath = `${this.folder}/images/` + image.$key;

        // Do these as two separate steps so you can still try delete ref if file no longer exists

        // Delete from Storage
        firebase.storage().ref().child(storagePath).delete()
        .then(
            () => {},
            (error) => console.error("Error deleting stored file",storagePath)
        );

        // Delete references
        this.af.database.object(referencePath).remove()
            
        

    }*/

}