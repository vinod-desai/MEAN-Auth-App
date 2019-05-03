const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// Register page
router.post("/register", (req, res, next) => {
  // res.send("User Registration page");
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: "Failed to register user"
      });
    } else {
      res.json({
        success: true,
        msg: "Registration Successful"
      });
    }
  });
});

// Authentication page
router.post("/authenticate", (req, res, next) => {
  // res.send("User Authentication page");
  const username = req.body.username;
  const password = req.body.password;
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), "secret", {
          expiresIn: 7000
        });
        res.json({
          success: true,
          token: `JWT ${token}`,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({ success: false, msg: "Incorrect Password" });
      }
    });
  });
});

// Profile page
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    // res.send("User Profile page");
    // console.log(req);
    res.json({ headers: req.headers, user: req.user });
  }
);

// Validate page
router.get(
  "/validate",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send("User Validate page");
  }
);

module.exports = router;
