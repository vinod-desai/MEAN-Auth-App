import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  // loggedIn: boolean;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    // this.loggedIn = this.auth.loggedIn();
  }
}
