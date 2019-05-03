import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ValidateService {
  constructor() {}
  validateRegistrationForm(user) {
    if (
      user.name === undefined ||
      user.username === undefined ||
      user.email === undefined ||
      user.password === undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email: string) {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(email + regExp.test(email.toLowerCase()));
    return regExp.test(email.toLowerCase());
  }

  validatePassword(pwd: string, confirmpwd: string) {
    if (pwd !== confirmpwd) {
      // console.log("Password and Confirm Password do not match");
      return false;
    }
    return true;
  }
}
