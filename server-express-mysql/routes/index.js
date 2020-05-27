var express = require('express');
var router = express.Router();
var models = require('../models');
const auth = require("../services/auth");
var multer = require('multer');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SO FIT App' });
});


router.post('/getauth', auth.verifyUser, function (req, res, next) {

})

module.exports = router;
