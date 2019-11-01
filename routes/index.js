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

client = stream.connect('sjc92jugd7js', 'rhtnurcusnqwkw4gpe2tx84wdd9wg6k92zn6q2wh9fs77t7bb8zzu8wbdvnfxhzm', '62811');
//client = stream.connect('sjc92jugd7js', null, '62811');
var loggedInUser;
var currentUser;
var feed;

async function getFollowers(){
  followers = await feed.followers();
  console.log(followers)
  return followers;
}

async function getFollowing(){
  followers = await feed.following();
  console.log(followers)
  return followers;
}

//welcome page
router.get('/', (req, res) => {
  res.render('index')
});

//logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

//get stream token
router.get('/getToken', ensureAuthenticated, function(req, res) {
  res.send(currentUser);
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
  // console.log(loggedInUser);
  //
  // User.findOne({ username: loggedInUser.username }).then(user => {
  //   if (user) {
  //     loggedInUser = user;
  //
  //   } else {
  //     console.log("error finding user")
  //   }
  // });

  res.render('edit_profile', {
    user: loggedInUser
  });
});

//follow user page
router.get('/follow_user', ensureAuthenticated, (req,res) => {
  getFollowers().then(function(result){
    getFollowing().then(function(result2){
      console.log(result);
      console.log("result2");
      console.log(result2);

      res.render('follow_user', {
        followers: result,
        following: result2
      });
    });
  });


});

//follow user page ERROR
router.get('/follow_user_error', ensureAuthenticated, (req,res) => {
  res.render('follow_user_error');
});

//follow user page SUCCESS
router.get('/follow_user_success', ensureAuthenticated, (req,res) => {
  res.render('follow_user_success');
});

//follow user
router.post('/follow_user', (req, res) => {
  console.log(req.body);

  User.findOne({ username: req.body.follow_username }).then(user => {
    if (user) {
      res.render('follow_user_success');
      //let feed = client.feed('timeline', email);
      feed.follow('Timeline', req.body.follow_username);

    } else {
      res.render('follow_user_error');
    }
  });

  //res.render('follow_user');
});

//unfollow user
router.post('/unfollow_user', (req, res) => {
  console.log(req.body);

  User.findOne({ username: req.body.unfollow_username }).then(user => {
    if (user) {
      res.render('follow_user_success');
      //let feed = client.feed('timeline', email);
      feed.unfollow('Timeline', req.body.unfollow_username);

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

  //connect to user's timeline
  User.findOne({ email: req.body.email }).then(user => {

    console.log(user);
    loggedInUser = user;

    userToken = client.createUserToken(user.username);
    //console.log(userToken);
    feed = client.feed('Timeline', user.username);
    //currentUser = feed.token;
    currentUser = userToken;
    //console.log(currentUser)

  });


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
  const fullname = req.body.lastname;
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
      fullname
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
          fullname
        })
      } else {
        const newUser = new User({
          username,
          email,
          password,
          fullname
        });

        client.user(username).create({
            name: fullname
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
  console.log(req.body.username);
  console.log(req.body.email);
  console.log(req.body.bio);
  console.log(req.body.fullname);

  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmpass;
  //const lastname = req.body.lastname;
  const fullname = req.body.fullname;
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
    console.log("rendering errors");
    res.render('edit_profile', {
      errors,
      username,
      email,
      password,
      fullname,
      bio,
      user: loggedInUser
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
          fullname,
          bio
        });
        //console.log("new user:")
        //console.log(newUser);
        let encrypt_password = true;

        if (email == '' || email == null) {
          newUser.email = oldUser.email;
        }
        if (password == '' || password == null) {
          console.log("Oh good god");
          newUser.password = oldUser.password;
          encrypt_password = false;
        }
        // if (fullname == '' || lastname == null) {
        //   newUser.lastname = oldUser.lastname;
        // }
        // if (firstname == '' || firstname == null) {
        //   newUser.firstname = oldUser.firstName;
        // }

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
                  loggedInUser = newUser;
                  //console.log(loggedInUser);

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
            loggedInUser = newUser;
            //console.log(loggedInUser);

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

// router.get('/*', (req,res) => {
//   res.render('404');
// });

module.exports = router;
