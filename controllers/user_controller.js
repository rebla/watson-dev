
var userRegistry = require('./../models/userRegistry');
var bcrypt = require('bcrypt-nodejs');
// GET /user
exports.isLogged = function(req, res, next){
  console.log(req.user);
  if (!req.user){
    console.log('No hay sesión activa');
    req.flash('message','Primero debes iniciar sesión');
    res.redirect('/login');
  }
  else {
     next();
  }
};

exports.new = function(req, res) {
    res.render('users/new');
};

// GET /user/:id/edit
exports.edit = function(req, res) {
  res.render('users/edit', { user: req.user, errors: []});
};            


// POST /user
exports.create = function(req, res) {
      console.log(req.body.username);
      bcrypt.hash(req.body.password, null, null, function(err, hash) {
      var user = {username:req.body.username, password:hash};

      userRegistry.addUser(user);
    });
    res.redirect("/");
      
  
};

// PUT /user/:id
exports.update = function(req, res, next) {
  req.user.username  = req.body.user.username;
  req.user.password  = req.body.user.password;
  
  userRegistry.updateUser(req.user);
  res.redirect('/');

};

// DELETE /user/:id
exports.destroy = function(req, res) {
  userRegistry.deleteUserById(req.user.id);
  res.redirect('/');
  
};