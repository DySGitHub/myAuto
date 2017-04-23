import { Component } from '@angular/core';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public error: any;

  constructor(public afService: AF, private router: Router) {}
//Google Sign In
  loginWithGoogle() {
    this.afService.loginWithGoogle().then((data) => {
      console.log(data);
              this.afService.addUserToFirebase();

              this.router.navigate(['/garage']);

    })
  }

//Email Sign In

  loginWithEmail(event, email, password){
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then((data) => {
              console.log(data);

      this.router.navigate(['/garage']);
    })
      .catch((error: any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
        }
      });
  }
}
