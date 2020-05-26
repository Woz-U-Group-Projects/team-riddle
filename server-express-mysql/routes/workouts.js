var express = require("express");
var router = express.Router();
var models = require("../models"); //<--- Add models
var auth = require("../services/auth"); //<--- Add authentication service

router.get("/", function(req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    auth.verifyUser(token).then(user => {
      if (user) {
        models.workouts
          .findAll({
            where: { userId: user.userId, Deleted: false }
          })
          .then(result => res.render("workouts", { workouts: result }));
        //console.log(user.posts);
        //res.render("posts", { posts: user.posts });
        //res.send(JSON.stringify(user));
      } else {
        res.status(401);
        res.send("Invalid authentication token");
      }
    });
  } else {
    res.status(401);
    res.send("Must be logged in");
  }
});

router.get("/:id", (req, res) => {
  let workoutId = parseInt(req.params.id);
  models.workouts
    .find({
      where: {
        workoutId: workoutId
      },
      include: [models.users]
    })
    .then(workout => {
      res.send(JSON.stringify(workout));
    });
});

router.post("/", function(req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    auth.verifyUser(token).then(user => {
      if (user) {
        models.workouts
          .findOrCreate({
            where: {
              userId: req.body.userId,
              workoutName: req.body.workoutName,
              noOfSets: req.body.noOfSets,
              noOfReps: req.body.noOfReps,
              noOfWeights: req.body.noOfWeights
            }
          })
          .spread((result, created) => res.redirect("/workouts"));
      } else {
        res.status(401);
        res.send("Invalid authentication token");
      }
    });
  } else {
    res.status(401);
    res.send("Must be logged in");
  }
});

router.delete("/:id", (req, res) => {
  let workoutId = parseInt(req.params.id);
  models.workouts
    .update(
      {
        Deleted: "true"
      },
      {
        where: {
          workoutId: workoutId
        }
      }
    )
    .then(workout => {
      res.send(JSON.stringify(workout));
    });
});

router.put("/:id", (req, res) => {
  let workoutId = parseInt(req.params.id);
  models.workouts
    .update(
      {
        userId: req.body.userId,
        workoutName: req.body.workoutName,
        noOfSets: req.body.noOfSets,
        noOfReps: req.body.noOfReps,
        noOfWeights: req.body.noOfWeights,
        workoutStatus: req.body.workoutStatus
      },
      {
        where: {
          workouId: workoutId
        }
      }
    )
    .then(workout => {
      res.send(JSON.stringify(workout));
    });
});

module.exports = router;
