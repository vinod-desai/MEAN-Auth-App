import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnChanges {
  @Input() isloggedIN = true;
  constructor(
    private auth: AuthService,
    private router: Router,
    private flashMsgSer: FlashMessagesService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnInit() {}

  onLogoutClick() {
    this.auth.logout();
    this.isloggedIN = this.auth.loggedIn();
    this.flashMsgSer.show("You are successfully logged out", {
      cssClass: "alert-success",
      timeout: 2000
    });
    this.router.navigate(["/login"]);
    // this.isloggedIN = true;
  }
}
