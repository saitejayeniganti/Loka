const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

const mid = (req, res, next) => {
  console.log("reached");
  // res.send();
  next();
};

router.get(
  "/gLogin",
  mid,
  passport.authenticate("gLogin", ["profile", "email"])
);
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
  console.log(req.user);
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

module.exports = router;
