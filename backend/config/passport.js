const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const keys = require('./keys');

const { google, facebook } = keys;
const { serverURL, apiURL } = keys.app;

const User = mongoose.model('User');
const secret = keys.jwt.secret;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

passport.use(
  new JwtStrategy(opts, (payload, done) => {
    User.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      })
      .catch(err => {
        return done(err, false);
      });
  })
);

module.exports = async app => {
  app.use(passport.initialize());
};