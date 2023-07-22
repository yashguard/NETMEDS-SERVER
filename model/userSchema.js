const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  verify: {
    type: Boolean,
    required: true,
  },
  product: {
    type: [],
  },
});

const User = mongoose.model("USER", userSchema);

module.exports = User;
