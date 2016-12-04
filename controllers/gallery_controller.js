var fs = require('fs');
var gallery_model = require('./../models/gallery.js');
var watson = require('watson-developer-cloud');

exports.list = function (req, res) {
	var images = gallery_model.photos;
	console.log(images)
	res.render('gallery/index', {images: images});
	
};

// Devuelve la vista del formulario para subir una nueva foto
exports.new = function (req, res) {
	res.render('gallery/new');
};

// Devuelve la vista de una foto con analisis.
exports.show = function (req, res) {
	var image = gallery_model.photos[req.params.photoId];
	var analysis = undefined
	//console.log(image.url)
	var visual_recognition = watson.visual_recognition({
	  api_key: '73ab782e6b49d418a6e5706fa487b80e1cf2f21a',
	  version: 'v3',
	  version_date: '2016-05-20'
	});

	var params = {
	  images_file: fs.createReadStream('public'+image.url)
	};

	visual_recognition.detectFaces(params, function(err, resp) {
	  if (err)
	    console.log(err);
	  else
	    analysis = resp;
		console.log("Resultado:")
		//JSON.parse(analysis)
		console.log(analysis.images[0].faces[0])
		console.log(typeof analysis)
		res.render('gallery/show', {image: image, age: analysis.images[0].faces[0].age, gender: analysis.images[0].faces[0].gender,
		identity: analysis.images[0].faces[0].identity});	
	});
	
};

exports.create = function (req, res) {
	var fstream;
	var image = req.files[0];
	console.log('Nuevo fichero de imagen. Datos: ', image);
	console.log(image.originalname)
	var imgname = image.originalname.split('.')[0];
	// Aquí debe implementarse la escritura del fichero de audio (track.buffer) en tracks.cdpsfy.es
	fs.writeFile('public/players/'+image.originalname, image.buffer, function(err) {
        if(err) {
    		return console.log(err);
    	}
	    console.log("The file was saved!");
    });

	var imgurl = '/players/'+image.originalname;

	console.log(imgurl);

 	// Escribe los metadatos de la nueva canción en el registro.
	gallery_model.photos[imgname] = {
		name: imgname,
		url: imgurl
	};

	res.redirect('/gallery');
};