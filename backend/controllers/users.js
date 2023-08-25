const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.loginUser = (req, res) => {
  let fetchedUser = undefined;

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        res.status(401).json({
          message: "Auth Failed!",
        });

      fetchedUser = user;

      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result)
        res.status(401).json({
          message: "Auth Failed!",
        });

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
    });
};

exports.signupUser = (req, res) => {
  const data = req.body.password;
  const saltRounds = 10;

  bcrypt
    .hash(data, saltRounds)
    .then((hash) => {
      const user = new User({ email: req.body.email, password: hash });

      return user.save();
    })
    .then(() => {
      res.status(201).json({
        message: "User successfully created!",
      });
    })
    .catch(() => {
      res.status(401).json({
        message: "Auth Failed!",
      });
    });
};
