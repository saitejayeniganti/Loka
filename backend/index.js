const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const cors = require("cors");
const connection = require("./database/mongoConnection");
var userRoute = require("./routes/userRoute");
var vendorRoute = require("./routes/vendorRoute");
//const authRoute = require("./routes/authentication");
//var auth = require("./routes/auth");
const passport = require("passport");
const { gAuth } = require("./utils/googleAuth");
const authrouter = require("./routes/login/authentication");
const { jwtAuth } = require("./utils/jwtAuth");
const MongoStore = require("connect-mongo");

app.use(
  session({
    key: "Loka",
    secret: "295B",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://sjsuloka:sjsuloka@lokacluster.mtom0hz.mongodb.net/?retryWrites=true&w=majority",
    }),
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
    },
  })
);

app.use(
  cors({
    origin: [process.env.REACT_URL],
    credentials: true,
  })
);
// app.use(cors({ origin: "*", credentials: true }));
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// app.use(cors({ origin: process.env.REACT_URL, credentials: true }));
// app.use(
//   cors({
//     origin: [process.env.REACT_URL],
//     credentials: true,
//   })
// );

//init google & jwt auths
gAuth();
jwtAuth();

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   next();
// });

async function initializeApplication() {
  try {
    app.use("/loca/user", userRoute);
    app.use("/loca/vendor", vendorRoute);
    app.use("/auth/", authrouter);

    await connection.createConnection();
    app.listen(process.env.NODE_PORT, () => {
      console.log("App listening on port" + process.env.NODE_PORT);
    });
  } catch (error) {
    return Promise.reject(error.message);
  }
}

initializeApplication()
  .then(() => console.log("Server Running"))
  .catch((error) => console.log(error));

module.exports = app;
