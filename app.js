const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const server = express();
dotenv.config({ path: "./config.env" });
const port = process.env.PORT;
const User = require("./model/userSchema");
server.use(express.json());
server.use(cors());
server.use(require("./router/auth"));

const middleware = (req, res, next) => {
  console.log("Hello thi is my middleware");
  next();
};

server.get("/", middleware, (req, res) => {
  console.log("Hello thi is my home page  ");
  res.status(200).send("Home page is here");
});

server.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);
  } catch (err) {
    console.log(err);
  }
});

server.listen(port, () => {
  console.log(`Server is running`);
});
