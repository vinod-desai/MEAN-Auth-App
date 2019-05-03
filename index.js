const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

const app = express();
const users = require("./routes/users");
const PORT = process.env.PORT || 3000;
const dbURI =
  "mongodb+srv://VinodD:MSD7@cluster0-e7aw0.mongodb.net/test?retryWrites=true";

//Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true });

// Check connection to DB
mongoose.connection.on("connected", () => {
  console.log("Connection to remote/cloud mongoDB successful");
});
mongoose.connection.on("error", err => {
  console.log(`Connection to MongoDB failed ${err}`);
});

// Middleware to allow cross origin request
/* app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}); */
// CORS (Cross-origin resource sharing) middleware
app.use(cors());

// Set Static folder for Client/FrontEnd
app.use(express.static(path.join(__dirname, "client")));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport JS Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

// Navigate users route to routes/users folder
app.use("/users", users);

// Home/Index route
app.get("/", (req, res) => {
  res.send("Hello!!");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/index.html"));
});

// Start Express web server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
