const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name."],
  },
  email: {
    type: String,
    required: [true, "Please provide email."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
