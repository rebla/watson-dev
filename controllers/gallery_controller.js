var fs = require('fs');
var gallery_model = require('./../models/gallery.js');
var watson = require('watson-developer-cloud');

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'HCy6msZTwP9ObW9lWms8i1Md1',
  consumer_secret: 'Eh9RFBx7zu4JGzGGHJNCS05zBN8XbS1e8yr2l77VPr3aAAbW2u',
  access_token_key: '377869454-x1QxQSdB69bpoeo2nuoYafiu5A7by4j8MIGpCe9r',
  access_token_secret: 'y1ZLoWq43yoaP91E0Htg8NST2CVmwuPURXfGuaTDgWAZl'
});


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
	var twitterprofile = undefined
	//console.log(image.url)
	var visual_recognition = watson.visual_recognition({
	  api_key: '73ab782e6b49d418a6e5706fa487b80e1cf2f21a',
	  version: 'v3',
	  version_date: '2016-05-20'
	});
	console.log("processing...")
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

		if (analysis.images[0].faces[0].identity != undefined) {
			//Search for social profiles
			var dname = analysis.images[0].faces[0].identity.name;
			client.get('users/search', {q: dname, include_entities: false}, function(error, users, response) {
		    //console.log(users);
		    for (var i = 0; i<users.length; i++) {
		   	  if (users[i].verified == true){
		   	 	twitterprofile = users[i].screen_name
		   	 	console.log(twitterprofile)
		   	 	res.render('gallery/show', {image: image, profiles: twitterprofile, age: analysis.images[0].faces[0].age, gender: analysis.images[0].faces[0].gender,
				identity: analysis.images[0].faces[0].identity});
		   	  }
		    }
			});

		}
		else{
		console.log("profile: "+twitterprofile)
		res.render('gallery/show', {image: image, profiles: undefined, age: analysis.images[0].faces[0].age, gender: analysis.images[0].faces[0].gender,
		identity: analysis.images[0].faces[0].identity});
		}
	});
	
};

exports.create = function (req, res) {
	var fstream;
	var image = req.files[0];
	console.log('Nuevo fichero de imagen. Datos: ', image);
	console.log(image.originalname)
	var imgname = image.originalname.split('.')[0];
	
	fs.writeFile('public/players/'+image.originalname, image.buffer, function(err) {
        if(err) {
    		return console.log(err);
    	}
	    console.log("The file was saved!");
    });

	var imgurl = '/players/'+image.originalname;

	console.log(imgurl);

 	
	gallery_model.photos[imgname] = {
		name: imgname,
		url: imgurl
	};

	res.redirect('/gallery');
};