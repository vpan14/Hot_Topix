var express = require('express');
var router = express.Router();
var path = require('path')
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//load user model
const User = require('../models/User.js');


// npm install getstream --save
var stream = require('getstream');


//var userToken;

client = stream.connect('sjc92jugd7js', 'rhtnurcusnqwkw4gpe2tx84wdd9wg6k92zn6q2wh9fs77t7bb8zzu8wbdvnfxhzm', '62811');
//client.

let userToken1 = client.createUserToken("user-one");
console.log(userToken1);

// client.user("vpan").getOrCreate({
//     name: "Victor Pan",
//     occupation: "Software Engineer",
//     gender: 'male'
// });

var userToken = client.createUserToken("vpan");

console.log(userToken);

//var feed = client.feed('Timeline', 'vpan', userToken);

var feed = client.feed('Timeline', 'vpan');

//feed = client.feed('Timeline', 'vpan');
// feed.follow_username(user)
//
// await client.setUser({
//     name: User.username,
//     occupation: "Software Engineer",
//     gender: 'male'
// });
console.log("adding activity for");
console.log(client.user('vpan').ref());
feed.addActivity({
    'actor': client.user('vpan').ref(),
    'verb': 'post',
    'object': 'I love this picture asdfdsf test',
    'attachments': {
        'og': {
            'title': 'Crozzon di Brenta photo by Lorenzo Spoleti',
            'description': 'Download this photo in Italy by Lorenzo Spoleti',
            'url': 'https://unsplash.com/photos/yxKHOTkAins',
            'images': [
                {
                    'image': 'https://goo.gl/7dePYs'
                }
            ]
        }
    }
})


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

    // client.setUser(client.user(user.username).get());
    // var user1 = client.feed('timeline', user.username);
    // var activity = {actor: client.user(user.username).ref(), verb: 'pin', object: 'Place:42'};
    // user1.addActivity(activity)
    //     .then(function(data) { console.log("activity added"); })
    //     .catch(function(reason) { console.log("error adding activity");
    //     console.log(reason);
    //    });



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

  console.log(req.pass);
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmpass;
  const lastname = req.body.lastname;
  const firstname = req.body.firstname;
  const bio = req.body.bio;

  let errors = [];

  //var oldUser;

  if(!email) {
    errors.push({message: 'Enter your email.'});
  }
  if(password != confirmPassword) {
    errors.push({message: 'Your passwords do not match.'});
  }

  if(errors.length > 0) {
    res.render('edit_profile', {
      errors,
      username,
      email,
      password,
      firstname,
      lastname,
      bio
    });
  } else {
    User.findOne({ email : email }, function (err, oldUser) {
      if(err)
      {
        console.log(err);
      }
      else {
        console.log("Old user inside else loop:");
        console.log(oldUser);

        var newUser = new User({
          email,
          username,
          password,
          lastname,
          firstname,
          bio
        });
        let encrypt_password = true;

        if (email == '' || email == null) {
          newUser.email = oldUser.email;
        }
        if (password == '' || password == null) {
          console.log("Oh good god");
          newUser.password = oldUser.password;
          encrypt_password = false;
        }
        if (lastname == '' || lastname == null) {
          newUser.lastname = oldUser.lastname;
        }
        if (firstname == '' || firstname == null) {
          newUser.firstname = oldUser.firstName;
        }

        if (bio == '' || bio == null) {
          newUser.bio = oldUser.bio;
        }

        if(encrypt_password == true) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              console.log(newUser);

              newUser._id = oldUser._id;

              User.updateOne({ email: oldUser.email }, newUser, function(err, numEntries, result) {
                if(err)
                {
                  console.log(err);
                }
                else {
                  req.flash('success_msg', 'Profile has been updated');
                  console.log("User has updated successfully");
                  res.redirect('/home');
                }
                
              });
            });
          });
        }

        else {
        console.log("New user:");
        console.log(newUser);

        newUser._id = oldUser._id;

        User.updateOne({ email: oldUser.email }, newUser, function(err, numEntries, result) {
          if(err)
          {
            console.log(err);
          }
          else {
            req.flash('success_msg', 'Profile has been updated');
            console.log("User has updated successfully");
            res.redirect('/home');
          }
          
        });
        }

        

      } //Else end 
      
    }); //FindOne end

  } //Else end

}); //Method end

module.exports = router;
