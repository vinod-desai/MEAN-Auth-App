import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ValidateService } from "../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
  constructor(
    private valSer: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}
  registerUser() {
    // console.log(this.name);
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    if (!this.valSer.validateRegistrationForm(user)) {
      // console.log("Please fill in all fields");
      // flash message will be visible for 1 second
      this.flashMessagesService.show("Please fill in all fields", {
        cssClass: "alert-danger",
        timeout: 1000
      });
      return false;
    }

    if (!this.valSer.validateEmail(user.email)) {
      // console.log("Please enter valid email address");
      this.flashMessagesService.show("Please enter valid email address", {
        cssClass: "alert-danger",
        timeout: 1000
      });
      return false;
    }

    if (!this.valSer.validatePassword(user.password, this.confirmpassword)) {
      this.flashMessagesService.show(
        "Password and Confirm Password donot match",
        {
          cssClass: "alert-danger",
          timeout: 1000
        }
      );
      console.log(user.password + " " + this.confirmpassword);
      return false;
    }
    // After Validation, send data to Register API
    this.auth.registerUser(user).subscribe((data: any) => {
      // console.log(data)
      if (data.success) {
        this.flashMessagesService.show("Registration Successful", {
          cssClass: "alert-success",
          timeout: 1000
        });
        this.router.navigate(["/login"]);
      } else {
        this.flashMessagesService.show("Registration UnSuccessful", {
          cssClass: "alert-danger",
          timeout: 1000
        });
      }
    });
  }
}
