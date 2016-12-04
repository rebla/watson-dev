var fs = require('fs');
// var track_model = require('./../models/track.js');
var trackRegistry = require('./../models/trackRegistry');

// Devuelve una lista de las canciones disponibles y sus metadatos
exports.list = function (req, res) {
	//var tracks = track_model.tracks;
	trackRegistry.getAllTracks(function(tracks){
	console.log(tracks)
	res.render('tracks/index', {tracks: tracks});

	});
	
};

// Devuelve la vista del formulario para subir una nueva canción
exports.new = function (req, res) {
	res.render('tracks/new');
};

// Devuelve la vista de reproducción de una canción.
// El campo track.url contiene la url donde se encuentra el fichero de audio
exports.show = function (req, res) {
	//var track = track_model.tracks[req.params.trackId];
	//track.id = req.params.trackId;
	trackRegistry.getTrackById(req.params.trackId, function(track){
		console.log(track[0])
		res.render('tracks/show', {track: track[0]});

		});
	//console.log(req.params.trackId)

	
};

// Escribe una nueva canción en el registro de canciones.
// TODO:
// - Escribir en tracks.cdpsfy.es el fichero de audio contenido en req.files.track.buffer
// - Escribir en el registro la verdadera url generada al añadir el fichero en el servidor tracks.cdpsfy.es
exports.create = function (req, res) {
	var fstream;
	var image = "";
	var track = req.files.track;
	image = req.files.image;
	track.path = '/mnt/nas/'+track.originalname;
	if (image != null){image.path = '/mnt/nas/'+image.originalname;}	
	console.log('Nuevo fichero de audio. Datos: ', track);
	console.log('Nuevo fichero de imagen. Datos: ', image);
	console.log('Archivo guardado en:', track.path);
	var id = track.name.split('.')[0];
	var name = track.originalname.split('.')[0];
	if (image != null){var imgname = image.originalname.split('.')[0];}
		

	// Aquí debe implementarse la escritura del fichero de audio (track.buffer) en tracks.cdpsfy.es
	fs.writeFile('/mnt/nas/'+track.originalname, track.buffer, function(err) {
   		 if(err) {
        return console.log(err);
    	}

    	console.log("The audio file was saved!");
	});
	 if (image != null){
	fs.writeFile('/mnt/nas/'+image.originalname, image.buffer, function(err) {
                 if(err) {
        return console.log(err);
        }

        console.log("The cover file was saved!");
        });
	}
	// Esta url debe ser la correspondiente al nuevo fichero en tracks.cdpsfy.es
	var url = 'http://tracks.cdpsfy.es/'+track.originalname;
	if (image != null){var imgurl = 'http://tracks.cdpsfy.es/'+image.originalname;}
	else{var imgurl = '/images/quaver3.png';}
	console.log(imgurl);

	var trackdb = {};
	trackdb["name"] = name;
	trackdb["url"] = url;
	trackdb["imgurl"] = imgurl;
	console.log(trackdb)

	trackRegistry.addTrack(trackdb);
 	// Escribe los metadatos de la nueva canción en el registro.
	/*track_model.tracks[name] = {
		name: name,
		url: url,
		imgurl: imgurl
	};*/

	res.redirect('/tracks');
};

// Borra una canción (trackId) del registro de canciones 
// TODO:
// - Eliminar en tracks.cdpsfy.es el fichero de audio correspondiente a trackId
exports.destroy = function (req, res) {
	var trackId = req.params.trackId;

	// Aquí debe implementarse el borrado del fichero de audio indetificado por trackId en tracks.cdpsfy.es
	fs.unlink('/mnt/nas/'+trackId+'.mp3', function(err){
    //comprobamos si ha ocurrido algun error
    if(err){
        console.error(err);
    }
    //informamos de que el fichero ha sido eliminado
    else{
        console.log("fichero eliminado");
    }
	});
	trackRegistry.deleteTrackById(req.params.trackId);
	// Borra la entrada del registro de datos
	/*delete track_model.tracks[trackId];*/
	res.redirect('/tracks');
};
