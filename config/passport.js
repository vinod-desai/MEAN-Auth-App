const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

module.exports = passport => {
  let opts = {};
  // opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = "secret";
  // console.log("passport auth");
  passport.use(
    new jwtStrategy(opts, (jwt_payoad, done) => {
      console.log(`Payload ${jwt_payoad}`);
      User.getUserById(jwt_payoad._id, (err, user) => {
        if (err) {
          // console.log("error");
          return done(err, false);
        }
        if (user) {
          // console.log("user found");
          return done(null, user);
        } else {
          // console.log("user not found");
          return done(null, false);
        }
      });
    })
  );
};
