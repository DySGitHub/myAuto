import { Component } from '@angular/core';
import { AF } from "../providers/af";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean;

  constructor(public afService: AF, private router: Router) {
    // This asynchronously checks if our user is logged it and will automatically
    // redirect them to the Login page when the status changes.
    // This is just a small thing that Firebase does that makes it easy to use.
    this.afService.af.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in.");

          this.isLoggedIn = false;
        }
        else {
          console.log("Successfully Logged in.");
          // Set the Display Name and Email so we can attribute posts to them
          if(auth.google) {
              
            this.afService.displayName = auth.google.displayName;
            this.afService.email = auth.google.email;
            this.afService.userid = auth.auth.uid;

          }
          else {
               afService.registereduser.subscribe(snapshot => {
     var getname = snapshot.name;
    console.log(getname)
                this.afService.displayName = getname;

  });
            this.afService.email = auth.auth.email;
            this.afService.userid = auth.auth.uid;
          }

          this.isLoggedIn = true;
          //this.router.navigate(['/garage']);
        }
      }
    );
  }

  logout() {
    this.afService.logout();
    this.router.navigate(['/login']);

  }
}
