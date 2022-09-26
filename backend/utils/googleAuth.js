const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const gAuth = () => {
  passport.use(
    "gLogin",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/gLogin/callback",
        scope: ["profile", "email"],
      },
      function (accessToken, refreshToken, profile, callback) {
        callback(null, profile);
      }
    )
  );

  passport.use(
    "gSignup",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/gSignup/callback",
        scope: ["profile", "email"],
      },
      function (accessToken, refreshToken, profile, callback) {
        callback(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

exports.gAuth = gAuth;
