/* 

Modelo de datos de canciones (track)

track_id: {
	name: nombre de la canción,
	url: url del fichero de audio
	imgurl: url de la imagen (cover)
} 

*/
var mongoose = require('mongoose');
//var collections = ["tracks","users"]
var dbconnect = mongoose.connect('mongodb://localhost:90/mongotracks');

var track = mongoose.model('Track', {name: String, url: String, imgurl: String}, 'tracks');
module.exports = track;





/*exports.tracks = {
	1: new track({
		name: 'Cute',
		url: '/media/Cute.mp3'
	}),
	2: new track({
		name: 'Dubstep',
		url: '/media/Dubstep.mp3'
	}),
	3: new track({
		name: 'Epic',
		url: '/media/Epic.mp3'
	}),
	4: new track({
		name: 'Littleidea',
		url: '/media/Littleidea.mp3'
	})
};*/
