var express = require('express');
var router = express.Router();
var path = require('path')
var viewsPath = path.join(__dirname, '../views/');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(viewsPath + "login.html");
});

module.exports = router;
