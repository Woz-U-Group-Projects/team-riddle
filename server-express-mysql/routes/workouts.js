var express = require("express");
var router = express.Router();
var models = require("../models");



router.get("/", function(req, res, next) {
  models.Workout.findAll().then(workouts => res.json(workouts));
  
});

router.post("/", function(req, res, next) {
  let newWorkout = new models.Workout();
  newWorkout.name = req.body.name;
  newWorkout.complete = req.body.complete;
  newWorkout.save().then(workout => res.json(workout));
});

router.delete("/:id", function(req, res, next) {
  let workoutId = parseInt(req.params.id);
  models.Workout.findByPk(workoutId)
    .then(workout => workout.destroy())
    .then(() => res.send({ workoutId }))
    .catch(err => res.status(400).send(err));
});

router.put("/:id", function(req, res, next) {
  models.Workout.update(
    {
      name: req.body.name,
      complete: req.body.complete
    },
    {
      where: { id: parseInt(req.params.id) }
    }
  ).then(workout => res.json(workout));
});


module.exports = router;
