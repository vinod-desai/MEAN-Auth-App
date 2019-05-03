import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(
    private auth: AuthService,
    private router: Router,
    private flashMsgSer: FlashMessagesService
  ) {}

  ngOnInit() {}
  onLoginSubmit() {
    // console.log(`${this.username} ${this.password}`);
    const user = {
      username: this.username,
      password: this.password
    };
    this.auth.authenticateUser(user).subscribe((data: any) => {
      // console.log(data);
      if (data.success) {
        this.auth.storeUserData(data.token, data.user);
        this.flashMsgSer.show("Login Successful", {
          cssClass: "alert-success",
          timeout: 1500
        });
        this.router.navigate(["/dashboard"]);
      } else {
        this.flashMsgSer.show(data.msg, {
          cssClass: "alert-danger",
          timeout: 1500
        });
      }
    });
  }
}
