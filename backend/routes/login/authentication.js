const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const { doExec } = require("../../utils/doQuery");
const UserModel = require("../../model/user");
const MerchantModel = require("../../model/merchant");
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

const getUserData = (userInfo) => {
  const {
    _id,
    provider,
    email,
    firstName,
    lastName,
    role,
    location,
    phone,
    image,
  } = userInfo;
  const user = {
    id: _id,
    provider,
    email,
    firstName,
    lastName,
    role,
    location,
    phone,
    image,
  };
  if (userInfo.role == 1) {
    user.storeName = userInfo.storeName;
  }
  user.temp = 0;
  return user;
};

router.get("/gLogin/callback", (req, res, next) =>
  passport.authenticate("gLogin", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login/failed");
    UserModel.findOne({ email: user.emails[0].value })
      .then((result) => {
        // console.log(result);
        if (!result) {
          user.temp = 1;
          // user.role = result.role;
          req.logIn(user, (err) => {
            // console.log("inside User");
            if (err) return next(err);
            return res.redirect(process.env.REACT_SIGNUP);
          });
        } else {
          const userData = getUserData(result);
          req.logIn(userData, (err) => {
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
    if (req.user.temp == 1) {
      const user = req.user;
      req.logout();
      res.status(200).json({
        user: user,
      });
    } else {
      res.status(200).json({
        user: req.user,
      });
    }
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

const insertMerchant = (body, user, res) => {
  const merchant = {};
  merchant.email = body.email;
  merchant.location = body.location;
  merchant.storeName = body.storeName;
  merchant._id = user._id;
  const newMerchant = new MerchantModel(merchant);
  newMerchant.save((err, result) => {
    if (err) {
      res.status(409).send({
        err: err.code === 11000 ? "Merchant already registered" : err.code,
      });
    } else {
      res.status(200).send({ _id: { ...result, userId: user.id } });
    }
  });
};

const getLocation = (body) => {
  const location = { type: "Point" };
  location.coordinates = [body.longitude, body.latitude];
  location.address = body.address;
  return location;
};

const insertUser = (body, res) => {
  const location = getLocation(body);
  body.location = location;

  const insertUser = new UserModel(body);
  insertUser.save((err, result) => {
    if (err) {
      res.status(409).send({
        err: err.code === 11000 ? "email already registered" : err.code,
      });
    } else {
      if (body.role == 1) {
        insertMerchant(body, result, res);
      } else {
        res.status(200).send({ _id: result });
      }
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

const setSession = (req, res, userInfo) => {
  const user = getUserData(userInfo);
  // req.logout();
  req.logIn(user, function (error) {
    if (!error) {
      console.log("succcessfully updated user session");
    }
    res.send(user);
  });
};

// if gauth and login as email then send message.
router.post("/login", (req, res) => {
  // for email & password
  if (req.user) {
    res.status(400).send({ err: "Please logout to signin to another account" });
    return;
  }
  const body = req.body;
  UserModel.findOne({ email: body.email })
    .then((result) => {
      if (result) {
        bcrypt.compare(body.password, result.password, (error, response) => {
          if (response) {
            if (result.role == 1) {
              MerchantModel.findOne({ _id: result._id })
                .then((merchant) => {
                  setSession(req, res, {
                    ...result._doc,
                    storeName: merchant.storeName,
                  });
                })
                .catch((err) => {
                  res.status(500).send({ err });
                });
            } else {
              setSession(req, res, result);
            }
          } else {
            res
              .status(404)
              .send({ err: "Wrong username/password combination!" });
          }
        });
      } else {
        res.status(404).send({ err: "User doesn't exist" });
      }
    })
    .catch((err) => {
      res.status(400).send({ err: "server side error" });
    });
});

router.get("/reset", (req, res) => {
  req.logout();
  res.send();
});

// router.get("/profile", (req, res) => {
//   res.send();
// });

const updateUser = (body, req, res) => {
  //if updating email need to update session info as well
  const query = { _id: body.id };
  const update = {
    firstName: body.firstName,
    lastName: body.lastName,
    phone: body.phone,
    location: body.location,
    image: body.image,
  };
  UserModel.findOneAndUpdate(query, update, { new: true })
    .then((user) => {
      if (body.role == 1) {
        MerchantModel.findOneAndUpdate(
          query,
          {
            location: body.location,
            storeName: body.storeName,
          },
          { new: true }
        )
          .then((merchant) => {
            setSession(req, res, {
              ...user._doc,
              storeName: merchant.storeName,
            });
            // res.status(200).send({});
          })
          .catch((err) => {
            res.status(500).send({ err });
          });
      } else {
        setSession(req, res, user);
        // res.status(200).send({});
      }
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
};

router.post("/profile", (req, res) => {
  const body = req.body;
  const location = getLocation(body);
  body.location = location;
  updateUser(body, req, res);
  // res.send();
});

module.exports = router;
