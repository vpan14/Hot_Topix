var express = require('express');
var router = express.Router();
var path = require('path')
var viewsPath = path.join(__dirname, '../views/');


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://vpan14:29Xrw6Sxo4v3Il4c@hottopix-acpd3.mongodb.net/test";





/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(viewsPath + "login.html");
});

router.get("/about",function(req,res){
  res.sendFile(viewsPath + "about.html");
});

router.get("/contact",function(req,res){
  res.sendFile(viewsPath + "contact.html");
});

router.get("/login",function(req,res){
  res.sendFile(viewsPath + "login.html");
});

router.post("/login", (req, res) => {
  console.log(req.body);
  console.log("login");

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database connected");

    var dbo = db.db("Users");
  });

  res.sendFile(viewsPath + "index.html");
});

router.get("/signup",function(req,res){
  res.sendFile(viewsPath + "signup.html");
});

router.post("/signup", (req, res) => {
  console.log(req.body);
  console.log("signup");

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database connected");

    var dbo = db.db("Users");
    var myobj = { username: req.body.username, email: req.body.email, password: req.body.password};
    dbo.collection("Users").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });

  res.sendFile(viewsPath + "login.html");
});

router.get("/edit_profile",function(req,res){
  res.sendFile(viewsPath + "edit_profile.html");
});

router.post('/edit_profile', (req, res) => {
  console.log(req.body);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database connected");

    var dbo = db.db("Users");
    var dbposts = db.db("Posts");
    var myquery = { username: req.body.username };
  //  var mypostobj = {$set: { actor: , verb: , object: , time: , to: , foreign_id: , topics: }};
    var myobj = {$set: { password: req.body.password, email: req.body.email} };
    dbo.collection("Users").updateOne(myquery, myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });

  res.sendFile(viewsPath + "edit_profile.html");
});



module.exports = router;
