const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = express.Router();

dotenv.config({ path: "./config.env" });
const db = process.env.DATABASE;
const User = require("../model/userSchema");
mongoose
  .connect(db)
  .then(() => {
    console.log("Connection successful");
  })
  .catch(() => {
    console.log("No connection");
  });

router.post("/signup", (req, res) => {
  let { fname, lname, email, password, confirmpassword, verify } = req.body;
  if (!fname && !fname && !email && !password && !confirmpassword) {
    res.status(422).send("Please fill the field");
  }
  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "User already exist" });
      }

      const newUser = new User({
        fname,
        lname,
        email,
        password,
        confirmpassword,
        verify,
        product: [],
      });

      newUser
        .save()
        .then(() => {
          res.status(200).send("User added succesfully");
        })
        .catch((err) => res.status(500).json({ Error: "Failed to signup" }));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
