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
        const user = (({ displayName, id, provider, emails, name }) => ({
          displayName,
          id,
          provider,
          emails,
          name,
        }))(profile);
        user.temp = 0;
        user.email = profile.emails[0].value;
        user.firstName = profile.name.givenName;
        user.lastName = profile.name.familyName;
        callback(null, user);
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
        const user = (({ displayName, id, provider, emails, name }) => ({
          displayName,
          id,
          provider,
          emails,
          name,
        }))(profile);
        user.temp = 1; //used in authentication js as well
        user.email = profile.emails[0].value;
        user.firstName = profile.name.givenName;
        user.lastName = profile.name.familyName;
        callback(null, user);
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
