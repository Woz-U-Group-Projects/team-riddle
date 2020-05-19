var express = require('express');
var router = express.Router();
var models = require('../models');
var auth = require('../services/auth');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

process.env.SECRET_KEY = 'secret'
/* GET users listing. */

router.get('/', function(req, res, next) {
  models.users
  .findAll({})
  .then(allUsers => {
    res.send(JSON.stringify(allUsers));
  })
});

router.get('/login', function(req,res,next) {
  res.render('login');
});

router.get('/register', function (req, res, next) {
  res.render('register');
});
router.post('/register', function (req, res, next) {
  models.users
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (user) {
        res.send('this user already exists');
      } else {
        const code = Math.random().toString(36).substr(2, 9) + req.body.lastName;
        console.log(req.body.password);

        models.users
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: auth.hashPassword(req.body.password), //<--- Change to this code here
            username: req.body.email
          })
          .then(createdUser => {
            const isMatch = createdUser.comparePassword(req.body.password);
            if (isMatch) {
              const userId = createdUser.userId;
              console.log(userId);
              const token = auth.signUser(createdUser);
              res.cookie('jwt', token);
              res.send(JSON.stringify(token));
            } else {
              console.error('not a match');
            }
          });
      }
    })
});

//Login
router.get('/login', function (req, res, next) {
  res.render('login');
})
router.post('/login', function (req, res, next) {
  const hashedPassword = auth.hashPassword(req.body.password);
  models.users
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      const isMatch=user.comparePassword(req.body.password)
      console.log(isMatch)
      if (!user) {
        console.log("User not found");
        return res.status(401).json({
          message: "Login Failed"
        });
      }
        if (isMatch) {
          let userId=user.userId;
          let token = auth.signUser(user);
          res.cookie('jwt', token);
          res.send(token);
        }
        else {
          console.log('Wrong password');
          // res.redirect('/users/login')
          res.send('Wrong password');
        }
      }
    );
});

router.get('/profile/:id', auth.verifyUser, function (req, res, next) {
  if (req.params.id !== String(req.user.userId)) {
    res.send('This is not your profile')
  } else {
    res.render('profile', {
      FirstName: req.user.firstName,
      LastName: req.user.lastName,
      Email: req.user.email,
      userId: req.user.userId,
    })
  }
});

router.get('/logout', function (req, res,next) {
  res.cookie("jwt", "", { expires: new Date(0) });
  res.redirect('/users/login');
});


// CRUD

router.post('/userworkouts', function (req, res, next) {

  models.workouts
    .findAll({
      where: {
        deleted: null,
        userId: req.body.userId
      }
    })
    .then(allWorkouts => {
      res.send(allWorkouts);
    })
});

router.post("/workouts", function (req, res, next) {
  models.workouts
    .findOrCreate({
      where: {
        userId: req.body.userId,
        workoutName: req.body.workoutName,
        noOfSets: req.body.noOfSets,
        noOfReps: req.body.noOfReps,
        noOfWeights: req.body.noOfWeights,
      },
      include:[model.users]
    })
    .spread((result, created) => {
      if (created) {
        res.send(result)
      }else {
        res.send("Must be logged in");
    }
});
});

router.get("workouts/:id", (req, res) => {
  let workoutId = parseInt(req.params.id);
  models.workouts
    .find({
      where: {
        workoutId: workoutId,
      },
      include: [models.users]
    })
    .then(workout => {
      res.send(JSON.stringify(workout))
    })
});

router.put("/workouts/:id", (req, res) => {
  let workoutId = parseInt(req.params.id);
  models.workouts
    .update({
      workoutName: req.body.workoutName,
      noOfSets: req.body.noOfSets,
      noOfReps: req.body.noOfReps,
      noOfWeights: req.body.noOfWeights,
      workoutStatus: req.body.workoutStatus,
    },
      {
        where: {
          workoutId: workoutId
        },

      })
    .then(workout => {
      res.send(JSON.stringify(workout));
    });
});


router.delete("/workouts/:id/delete", (req, res) => {
  let workoutId = parseInt(req.params.id);
  models.workouts
    .update(
      {
        Deleted: 'true'
      },
      {
        where: {
          workoutId: workoutId
        },

      })
    .then(workout => {
      res.send(JSON.stringify(workout))
    })
});



/* router.get("/", function (req, res, next) {
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
}); */
module.exports = router;





