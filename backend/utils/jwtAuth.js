const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const passport = require("passport");

function jwtAuth() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.PASSPORT_SECRET,
  };

  passport.use(
    new JwtStrategy(opts, (payload, callback) => {
      callback(null, payload);
    })
  );
}

exports.jwtAuth = jwtAuth;
exports.checkAuth = passport.authenticate("jwt", {
  session: false,
});
