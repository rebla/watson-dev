var express = require('express');
var router = express.Router();
var multer  = require('multer');
var galleryController = require('../controllers/gallery_controller');

//var upload = multer({ dest: './public/uploads/'});
var upload = multer({inMemory: true});


router.get('/', function(req, res) {
  res.render('index');
});

router.get('/gallery', galleryController.list);

router.get('/gallery/new',  galleryController.new);

router.get('/gallery/:photoId', galleryController.show);

router.post('/gallery', upload.any(), galleryController.create);
//(router.delete('/gallery/:photoId', galleryController.destroy);

module.exports = router;
