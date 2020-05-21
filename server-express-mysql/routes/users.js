var express = require('express');
var router = express.Router();
var models = require('../models');
var auth = require('../services/auth');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

process.env.SECRET_KEY = 'secret'
/* GET users listing. */
router.get('/', function (req, res, next) {
  models.users
    .findAll({})
    .then(allUsers => {
      res.send(JSON.stringify(allUsers));
    })
});


router.get('/login', function (req, res, next) {
  res.render('login');
})
router.get('/register', function (req, res, next) {
  res.render('register');
})
router.post('/register', function (req, res, next) {
  const hashedPassword = auth.hashPassword(req.body.password);
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

        models.users
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            password: hashedPassword,
            weight: req.body.weight,
            height: req.body.height,
            birthday: req.body.birthday,
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
})

//User Welcome Page
router.get('/welcome', auth.verifyUser, function (req, res, next) {
  if (req.params.id !== String(req.user.userId)) {
    res.send('You are not an authorized member')
  } else {
    res.render('welcome', {
      FirstName: req.user.firstName,
      LastName: req.user.lastName,
      UserId: req.user.userId,
    })
  }
});


//Login
router.get('/login', function (req, res, next) {
  res.render('login');
})
router.post('/login', function (req, res, next) {
  const hashedPassword = auth.hashPassword(req.body.password);
  models.users.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    const isMatch = user.comparePassword(req.body.password)
    console.log(isMatch)
    if (!user) {
      return res.status(401).json({
        message: "Login Failed"
      });
    }
    if (isMatch) {
      const userId = user.userId
      const token = auth.signUser(user);
      res.cookie('jwt', token);
      res.send(token);

    } else {
      console.log(error);
      // res.redirect('/users/login')
    }
  });
});

router.get('/profile/:id', auth.verifyUser, function (req, res, next) {
  if (req.params.id !== String(req.user.userId)) {
    res.send('This is not your profile')
  } else {
    res.render('profile', {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      userId: req.user.userId,
      userName: req.user.userName,
      password: req.user.password,
      weight: req.body.weight,
      height: req.body.height,
      birthday: req.body.birthday
    })
  }
});

router.put('/profile/:id', (req, res, next) => {
  let userId = parseInt(req.params.id);
  models.users
    .update({
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      userId: req.user.userId,
      userName: req.user.userName,
      password: req.user.password,
      weight: req.body.weight,
      height: req.body.height,
      birthday: req.body.birthday
        },
      {
        where: {
          userId: userId
        },

      })
    .then(user => {
      res.send(JSON.stringify(user));
    });
});



router.get('/logout', function (req, res) {
  res.cookie('jwt', null);
  res.redirect('/users/login');
});


// Workout CRUD

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


router.post('/workouts', (req, res) => {

  models.workouts
    .findOrCreate({
      where: {
        userId: req.body.userId,
        workoutName: req.body.workoutName,
        noOfSets: req.body.noOfSets,
        noOfReps: req.body.noOfReps,
        noOfWeights: req.body.noOfWeights,
      },
      include: [models.users]
    })
    .spread(function (result, created) {
      if (created) {
        res.send(result)
      } else {
        res.send('');
      }

    });
});

router.get('/workouts/:id', (req, res) => {
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

router.put('/workouts/:id', (req, res, next) => {
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

router.delete('/workouts/:id/delete', (req, res) => {
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
      res.send(JSON.stringify(workout));
    })

});



module.exports = router;

