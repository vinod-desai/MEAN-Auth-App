import { Component } from "@angular/core";
import { Router, Event, NavigationEnd, NavigationError } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "AngularV7";
  isloggedIN = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        // Set isLoggedIN to true if the route is dashboard/profile
        // console.log(event);
        if (event.url === "/dashboard" || event.url === "/profile") {
          this.isloggedIN = true;
        }
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
  }
}
