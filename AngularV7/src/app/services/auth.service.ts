import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
// import { tokenNotExpired } from "angular2-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {}

  registerUser(user) {
    const httpOptions = new HttpHeaders();
    httpOptions.append("Content-Type", "application/json");

    return this.http.post("http://localhost:3000/users/register", user, {
      headers: httpOptions
    });
  }

  authenticateUser(user) {
    const httpOptions = new HttpHeaders();
    httpOptions.append("Content-Type", "application/json");

    return this.http.post("http://localhost:3000/users/authenticate", user, {
      headers: httpOptions
    });
  }

  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile() {
    let httpHeaders = new HttpHeaders();
    this.loadToken();
    // console.log(this.authToken);
    httpHeaders = httpHeaders.append("Authorization", this.authToken);
    httpHeaders = httpHeaders.append("Content-Type", "application/json");

    /* const httpOptions = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.authToken
    }); */

    // console.log(`Header ${JSON.stringify(httpHeaders)}`);

    return this.http.get("http://localhost:3000/users/profile", {
      headers: httpHeaders
    });

    /* return this.http.get("http://localhost:3000/users/validate", {
      headers: httpOptions
    }); */
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    // console.log(`This is user token ${token}`);
    this.authToken = token;
  }

  loggedIn() {
    // return tokenNotExpired();
    if (this.authToken === null || this.authToken === undefined) {
      return false;
    }
    return true;
  }
}
