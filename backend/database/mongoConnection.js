const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const createConnection = async function () {
  const options = {
    autoIndex: false,
    connectTimeoutMS: 10000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (!process.env.MONGO_CONN_URL) {
    console.log("Environment variables not set");
    throw "Error While connecting to DB";
  }
  const mongo_url = process.env.MONGO_CONN_URL;
  await mongoose
    .connect(mongo_url, options)
    .then(() => console.log("Connected to DB"))
    .catch((err) => {
      console.log("Failed to connect to DB");
      console.log(err);
    });
};

const closeConnection = async function () {
  mongoose.connection.close();
};

module.exports.createConnection = createConnection;
module.exports.closeConnection = closeConnection;
