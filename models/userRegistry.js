var user = require('./user.js');


exports.addUser = function(usertosave) {
   	var userdb = new user ({
   		username: usertosave.username,
   		password: usertosave.password
   		
   	});
    userdb.save(  user, function(error, saved) {
        if (error) log.warn('MongoDB: Error adding   user: ', error);
        console.log('user added!')
    });
};

exports.updateUser = function(usertoupdate) {
    
    usertoupdate.update(  user, function(error, saved) {
        if (error) log.warn('MongoDB: Error updating   user: ', error);
        console.log('user updated!')
    });
};

exports.getUserById = function(userid, callback) {
   	
   	  user.find({ username: userid }, function(err, user) {
  			if (err) throw err;

  			//console.log(  user);
  			if (callback !== undefined) {
            callback(user);
        }
	});
	

};
exports.hasUser = function(id, callback) {

      user.find(id, function(user) {
        if (user === undefined) {
            callback(false);
        } else {
            callback(true);
        }
    });
	  
	};
	
exports.deleteUserById = function(userid){

	  user.findOneAndRemove({ name: userid }, function(err) {
  			if (err) throw err;

    		console.log('  user successfully deleted!');
 			});
        
};
	