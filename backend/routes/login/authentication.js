const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const { doExec } = require("../../utils/doQuery");
const UserModel = require("../../model/user");
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const saltRounds = 10;

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/gLogin", passport.authenticate("gLogin", ["profile", "email"]));
router.get("/gSignup", passport.authenticate("gSignup", ["profile", "email"]));
// router.get("/gLogin", passport.authenticate("gLogin", ["profile", "email"]));

// router.get(
//   // check if user is there in our database. https://stackoverflow.com/questions/64622098/passportjs-google-auth-saves-existing-user-as-a-new-user-in-the-database-how-ca
//   "/gLogin/callback",
//   passport.authenticate("gLogin", {
//     successRedirect: process.env.REACT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

router.get("/gLogin/callback", (req, res, next) =>
  passport.authenticate("gLogin", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login/failed");
    UserModel.findOne({ email: user.emails[0].value })
      .then((result) => {
        console.log(result);
        if (!result) {
          user.temp = 1;
          req.logIn(user, (err) => {
            if (err) return next(err);
            return res.redirect(process.env.REACT_SIGNUP);
          });
        } else {
          req.logIn(user, (err) => {
            if (err) return next(err);
            return res.redirect(process.env.REACT_URL);
          });
        }
      })
      .catch((err) => {
        req.logIn(user, (err) => {
          if (err) return next(err);
          return res.redirect(process.env.REACT_URL);
        });
      });
  })(req, res, next)
);

router.get(
  "/gSignup/callback",
  passport.authenticate("gSignup", {
    successRedirect: process.env.REACT_SIGNUP,
    failureRedirect: "/signup/failed",
  })
);

router.get("/loggedUser", (req, res) => {
  if (req.user) {
    res.status(200).json({
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  // res.redirect(process.env.REACT_URL);
  res.send();
});

const checkRegistration = () => {};

const insertUser = (body, res) => {
  const insertUser = new UserModel(body);
  insertUser.save((err, result) => {
    if (err) {
      res.status(409).send({
        err: err.code === 11000 ? "email already registered" : err.code,
      });
    } else {
      res.status(200).send({ _id: result });
    }
  });
};

router.post("/signup", (req, res) => {
  const body = req.body; //frontend sent params must must else reassign here
  if (body.provider === "email") {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) {
        res.status(404).send({ err: err.code });
        return;
      } else {
        body.password = hash;
        insertUser(body, res);
      }
    });
  } else {
    insertUser(body, res);
  }

  // user
  //   .findOne({ email }, ["password"])
  //   .then((res) => {})
  //   .catch((err) => {});
  // res.send();
  //signup here
  //using email
  //using google
});

router.post("/login", (req, res) => {
  // for email & password
});

router.get("/reset", (req, res) => {
  req.logout();
  res.send();
});

module.exports = router;
