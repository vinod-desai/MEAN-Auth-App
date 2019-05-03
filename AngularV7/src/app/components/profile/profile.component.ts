import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: any;
  errObj: any;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.getProfile().subscribe(
      (profile: any) => {
        this.user = profile.user;
      },
      err => {
        // console.log(`Error: ${JSON.stringify(err)}`);
        this.errObj = {
          status: err.status,
          message: err.statusText
        };
        return false;
      }
    );
  }
}
