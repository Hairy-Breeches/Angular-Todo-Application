const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.loginUser = (req, res) => {
  let fetchedUser = undefined;

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({
          message: "Auth Failed!",
        });

        return;
      }

      fetchedUser = user;

      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        res.status(401).json({
          message: "Auth Failed!",
        });

        return;
      }

      const payload = {
        email: fetchedUser.email,
        id: fetchedUser._id,
      };

      const token = jwt.sign(payload, process.env.SECRET_PHRASE);

      res.status(200).json({
        message: "Auth passed!",
        token: token,
        expiresIn: 3600,
      });
    })
    .catch(() => {
      if (!res.headersSent) {
        res.status(500).json({
          message: "Server failed to process the request!",
        });
      }
    });
};

exports.signupUser = (req, res) => {
  const data = req.body.password;
  const saltRounds = 10;
  const user = new User(null, null);

  bcrypt
    .hash(data, saltRounds)
    .then((hash) => {
      user.email = req.body.email;
      user.password = hash;

      return User.findOne({ email: user.email });
    })
    .then((result) => {
      if (result) {
        res.status(401).json({
          message: "User already exists!",
        });

        return;
      }
      user.save().then(() => {
        res.status(201).json({
          message: "User successfully created!",
        });
      });
    })
    .catch(() => {
      if (!res.headersSent) {
        res.status(401).json({
          message: "Authentication Failed!",
        });
      }
    });
};
