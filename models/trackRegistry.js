var track = require('./track');

exports.addTrack = function(tracktosave) {
   	
   	var trackdb = new track ({
   		name: tracktosave.name,
   		url: tracktosave.url,
   		imgurl: tracktosave.imgurl
   	});

    trackdb.save(track, function(error, saved) {
        if (error) log.warn('MongoDB: Error adding track: ', error);
        console.log('track added!')
    });
};
exports.getTrackById = function(trackid, callback) {
   	
   	track.find({ name: trackid }, function(err, track) {
  			if (err) throw err;

  			//console.log(track);
  			if (callback !== undefined) {
            callback(track);
        }
	});
	

};
exports.getAllTracks = function(callback){

	track.find({}, function(err, tracks){
		if (err) throw err;
		//console.log(tracks);
		if (callback !== undefined) {
            callback(tracks);
        }
	});
	
};
exports.deleteTrackById = function(trackid){

	track.findOneAndRemove({ name: trackid }, function(err) {
  			if (err) throw err;

    		console.log('track successfully deleted!');
 			});
        
};
	


