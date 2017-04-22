import { Component } from '@angular/core';
import { AF } from "../providers/af";
import { Router } from "@angular/router";
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
      public isCollapsed = true;

  public isLoggedIn: boolean;

  constructor(public afService: AF, private router: Router) {
   
    this.afService.af.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in.");

        }
        else {
          console.log("Successfully Logged in.");
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
              console.log(this.afService.userid);
              
          }

          this.isLoggedIn = true;
            

        }
      }
    );
  }

  logout() {
    this.afService.logout();
    this.router.navigate(['/login']);


  }

  g2garage() {
    this.router.navigate(['/garage']);
  }

topFunction()
{
    window.scrollTo(0,0);
}



}
