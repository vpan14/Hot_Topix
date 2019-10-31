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
    successRedirect: '/home',
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
