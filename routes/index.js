var express = require('express');
var router = express.Router();
var path = require('path')
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


//load user model
const User = require('../models/User.js');

//welcome page
router.get('/', (req, res) => {
  res.render('index')
});

//about page
router.get('/about', (req,res) => {
  res.render('about');
});

//contact page
router.get('/contact', (req,res) => {
  res.render('contact');
});

//login page
router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('login')
});

//signup page
router.get('/signup', forwardAuthenticated, (req, res) => {
  res.render('signup')
});

//edit profile page
router.get('/edit_profile', ensureAuthenticated, (req,res) => {
  res.render('edit_profile');
});

//login action
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

//signup action
router.post('/signup', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const lastname = req.body.lastname;
  let errors = [];

  console.log(req.body);

  if(!username || !email || !password) {
    errors.push({ message: 'Enter Required Fields' });
  }

  if(errors.length > 0) {
    res.render('signup', {
      errors,
      username,
      email,
      password,
      lastname
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if(user) {
        errors.push({ msg: 'Email already exists' });
        res.render('signup', {
          errors,
          username,
          email,
          password,
          lastname
        })
      } else {
        const newUser = new User({
          username,
          email,
          password,
          lastname
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
              req.flash('success_msg', 'You are now registered and can log in');
              console.log("User added to database");
              res.redirect('/login');
            })
            .catch(err => console.log(err));
          });
        });
      }
    });
  }
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
