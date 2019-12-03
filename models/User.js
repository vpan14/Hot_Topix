const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
  username: String,
  email: String,
  password: String,
  fullname: String,
  //firstname: String,
  bio: String,

  followed_topics: []
});

module.exports = mongoose.model('Users', UserSchema);
