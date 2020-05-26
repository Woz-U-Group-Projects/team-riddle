var express = require("express");
var router = express.Router();
var models = require("../models");
var auth = require("../services/auth");

router.get("/", function(req, res, next) {
  // let token = req.cookies.jwt;
  // if (token) {
  //   auth.verifyUser(token).then(user => {
  //     if (user) {
  models.vitals
    .findAll({
      //where: { userId: user.userId, Deleted: false }
    })
    .then(result => res.render("vitals", { vitals: result }));
  //     } else {
  //       res.status(401);
  //       res.send("Invalid authentication token");
  //     }
  //   });
  // } else {
  //   res.status(401);
  //   res.send("Must be logged in");
  // }
});

router.get("/:id", (req, res) => {
  let vitalId = parseInt(req.params.id);
  models.vitals
    .find({
      where: {
        vitalId: vitalId
      },
      include: [models.users]
    })
    .then(vital => {
      res.send(JSON.stringify(vital));
    });
});

router.post("/", function(req, res, next) {
  let newVitals = new models.vitals();

  newVitals.userId = req.body.userId;
  newVitals.vitalName = req.body.vitalName;
  newVitals.heartRate = req.body.heartRate;
  newVitals.temperature = req.body.temperature;
  newVitals.o2levels = req.body.o2levels;
  newVitals.save().then(vitals => res.json(vitals));

});

module.exports = router;
