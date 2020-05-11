var express = require('express');
var router = express.Router();
var models = require('../models');
const auth = require('../services/auth');


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
            password: hashedPassword,
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
})

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
      if (!user) {
        console.log("User not found");
        return res.status(401).json({
          message: "Login Failed"
        });
      }
      else {
        let passwordMatch = authService.comparePassword(
          req.body.password,
          user.password
        );
        if (passwordMatch) {
          let token = auth.signUser(user);
          res.cookie('jwt', token);
          res.redirect('profile');
        }
        else {
          console.log('Wrong password');
          // res.redirect('/users/login')
          res.send('Wrong password');
        }
      }
    });
});

router.get('/profile/:id', auth.verifyUser, function (req, res, next) {
  if (req.params.id !== String(req.user.userId)) {
    res.send('This is not your profile')
  } else {
    res.render('profile', {
      FirstName: req.user.firstName,
      LastName: req.user.lastName,
      Email: req.user.email,
      UserId: req.user.userId,
    })
  }
});

router.get('/logout', function (req, res,next) {
  res.cookie("jwt", "", { expires: new Date(0) });
  res.redirect('/users/login');
});


// To DO CRUD

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






module.exports = router;

