const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const dbURI =
  "mongodb+srv://VinodD:MSD7@cluster0-e7aw0.mongodb.net/test?retryWrites=true";
mongoose.connect(dbURI, { useNewUrlParser: true });

const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};

module.exports.getUserByUsername = (username, callback) => {
  User.findOne({ username }, callback);
};

module.exports.addUser = (user, callback) => {
  // Encrypt the password and store it in database
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      user.save(callback);
    });
  });
};

module.exports.comparePassword = (pwd, hash, callback) => {
  bcrypt.compare(pwd, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
