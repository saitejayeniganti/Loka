const express = require("express");
const mongoConnection = require("./database/mongoConnection");
const sqlConnection = require("./database/sqlConnection");
var app = express();
var cors = require("cors");
// app.use(cors({ origin: "*", credentials: true }));
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(8080, () => {});

exports.app = app;
