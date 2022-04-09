const mysql = require("mysql");
const util = require("util");
const dotenv = require("dotenv");
dotenv.config();

const connector = mysql.createPool({
  connectionLimit: 10,
  host: process.env.SQL_CONN_URL,
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB,
});

connector.getConnection((error, connection) => {
  if (error) {
    if (error.code === "ECONNREFUSED") {
      console.error("Connection refused by Database");
    }
    if (error.code === "ER_CON_COUNT_ERROR") {
      console.error("Connection limit reached for Database");
    }
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Connection was closed.");
    }
  }
  if (connection) {
    console.log("SQL connection working");
    connection.release();
  }
});

const db = {
  query: (query, values, callback) => {
    connector.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        return callback(err);
      }
      return callback(null, result);
    });
  },
};

module.exports = db;

// Usage: import db, then use db.query to query database
