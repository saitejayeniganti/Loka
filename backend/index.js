const express = require("express");
const mongoConnection = require("./database/mongoConnection");
const sqlConnection = require("./database/sqlConnection");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mysql = require("mysql");
const router = require("./src/router");

const connection = require("./database/mongoConnection");

// Passport js
// const passport = require("passport");
// const { auth } = require("./src/utils/auth");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"], // add to constants file or configuration file.
    // origin: '*',
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(passport.initialize());

app.use("/", router);

// MongoDB connection.
//await connection.createConnection();

if (!module.parent) {
  app.listen(5000, () => {
    try {
      console.log("Node Started");
    } catch (error) {
      console.log("Error");
    }
  });
}

exports.app = app;
