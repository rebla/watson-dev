var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost:90/mongotracks');

var user = mongoose.model('User', {username: String, password: String}, 'users');
module.exports = user;