const express = require("express");
const passport = require("passport");
const router = express.Router();

const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/gLogin", passport.authenticate("gLogin", ["profile", "email"]));
// router.get("/gSignup", passport.authenticate("gSignup", ["profile", "email"]));
// router.get("/gLogin", passport.authenticate("gLogin", ["profile", "email"]));

router.get(
  "/gLogin/callback",
  passport.authenticate("gLogin", {
    successRedirect: process.env.REACT_URL,
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    // set jwt here
  }
);

router.get(
  "/gSignup/callback",
  passport.authenticate("gSignup", {
    successRedirect: process.env.REACT_SIGNUP,
    failureRedirect: "/signup/failed",
  }),
  (req, res) => {
    // set jwt here
  }
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
  res.send();
});

router.get("/reset", (req, res) => {
  req.logout();
  res.send();
});

module.exports = router;
