const express = require('express');
const { productController } = require('../Controllers');
const router = express.Router()


router.get('/getAllProduct', productController.getAllProduct);
router.post('/addProduct', productController.addProduct);
router.patch('/editProduct', productController.editProduct);
router.delete('/deleteProduct', productController.deleteProduct);


module.exports = router;