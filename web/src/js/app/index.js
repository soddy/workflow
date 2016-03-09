var userController = require('../controllers/userController');
var productController = require('../controllers/productController');

$(function(){
	userController.init();
	productController.init();
	console.log('ok2');
})
