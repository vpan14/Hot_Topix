var express = require('express');
var router = express.Router();
var path = require('path')
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//load user model
const User = require('../models/User.js');


// npm install getstream --save
let stream = require('getstream');

//var userToken;

let client = stream.connect("2awqgkw9rzgj", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidXNlci1vbmUifQ.ljVM50gE9_oDeJ5pNSAPoGrOsVVIYJkXP1dpq-gv2NM");

// feed.follow_username(user)
//
// await client.setUser({
//     name: User.username,
//     occupation: "Software Engineer",
//     gender: 'male'
// });
// feed.addActivity({
//     'actor': client.user('user-one').ref(),
//     'verb': 'post',
//     'object': 'I love this picture',
//     'attachments': {
//         'og': {
//             'title': 'Crozzon di Brenta photo by Lorenzo Spoleti',
//             'description': 'Download this photo in Italy by Lorenzo Spoleti',
//             'url': 'https://unsplash.com/photos/yxKHOTkAins',
//             'images': [
//                 {
//                     'image': 'https://goo.gl/7dePYs'
//                 }
//             ]
//         }
//     }
// })


//welcome page
router.get('/', (req, res) => {
  res.render('index')
});

//logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
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

//follow user page
router.get('/follow_user', ensureAuthenticated, (req,res) => {
  res.render('follow_user');
});

//follow user page ERROR
router.get('/follow_user_error', ensureAuthenticated, (req,res) => {
  res.render('follow_user_error');
});

//follow user page SUCCESS
router.get('/follow_user_success', ensureAuthenticated, (req,res) => {
  res.render('follow_user_success');
});

router.post('/follow_user', (req, res) => {
  console.log(req.body);

  User.findOne({ username: req.body.follow_username }).then(user => {
    if (user) {
      res.render('follow_user_success');
      //let feed = client.feed('timeline', email);

    } else {
      res.render('follow_user_error');
    }
  }
  // dbo.collection("Users").findOne(query).toArray(function(err, result) {
  //   if (err) throw err;
  //   console.log(result);
  // }
);

  //res.render('follow_user');
});

//login action
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);

  User.findOne({ email: req.body.email }).then(user => {

    // console.log(user);
    // client.setUser(user);
    // thisUser = client.user(user.username).getOrCreate({
    //     name: user.username,
    //     email: user.email
    // });
    //
    //
    // console.log(thisUser);

    client.setUser(client.user(user.username).get());
    var user1 = client.feed('timeline', user.username);
    var activity = {actor: client.user(user.username).ref(), verb: 'pin', object: 'Place:42'};
    user1.addActivity(activity)
        .then(function(data) { console.log("activity added"); })
        .catch(function(reason) { console.log("error adding activity");
        console.log(reason);
       });



  });
  console.log("test");
  // client.setUser(client.user(req.body.email).get());
  // var user1 = client.feed('timeline', req.body.email);
  // var activity = {actor: req.body.email, verb: 'pin', object: 'Place:42'};
  // user1.addActivity(activity)
  //     .then(function(data) { /* on success */ })
  //     .catch(function(reason) { /* on failure, reason.error contains an explanation */ });

  // console.log(client.user(req.body.email).get());
  //console.log(client.user(req.body.email).get());

  //console.log(client.user(username).get());
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

        client.user(username).create({
            name: "URF"
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
