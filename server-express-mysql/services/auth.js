const jwt = require("jsonwebtoken");
const models = require("../models/index");
const bcrypt = require("bcryptjs");

module.exports = {
  signUser: function (user) {
    const token = jwt.sign(
      {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isLoggedIn: true
      },
      "secret",
      {
        expiresIn: "1h"
      }
    );
    return token;
  },
  verifyUser: function (req, res, next) {
    //<--- receive JWT token as parameter
    try {
      let token = req.cookies.jwt;
      let decoded = jwt.verify(token, "secret"); //<--- Decrypt token using same key used to encrypt
      req.userData = decoded;
      return models.users.findOne({
        where: {
          userId: decoded.userId
        }
      })
        .then(user => {
          req.user = user;
          next();
        }); //<--- Return result of database query as promise
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  hashPassword: function (plainTextPassword) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;
  }
};


