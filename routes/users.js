var express = require('express');
var router = express.Router();
var models = require('../server/models/index');
var config = require('config');

/* GET users listing. */
router.get('/', function(req, res, next) {

var dbHost = config.get('caregen.emailConfig.emailUser');

/*var port = config.get('dbConfig.port');
var initialLimit = config.get('credit.initialLimit');
var initialDays = config.get('credit.initialDays');

console.log(host);
console.log(host);
console.log(initialLimit);
console.log(initialDays); */

console.log(dbHost);


	models.Users.findAll({attributes: ['emailid', 'name', 'password']}).then(function(Users) {
    res.json(Users);
  });

});

module.exports = router;
