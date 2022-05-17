const express = require('express');
const router = express.Router();
const Product = require('../controllers/product')
const SAuth = require('../middleware/storetoken');
const Auth = require('../middleware/token');

//GET /product
router.get('/', Product.GetProducts)

//GET /product/categorys
router.get('/categorys', Product.DistinctCategorys)

//GET /product/sPrd/:id
router.get('/sPrd/:id', Product.GetSimilarProducts)

//GET /product/:id
router.get('/:id', Product.GetTheProduct)

//POST /product
router.post('/', Auth, SAuth, Product.NewProduct)

//POST /product/updateState/:id
router.post('/updateState/:id', Product.UpdateProductState)

//POST /product/upd/:id
router.post('/upd/:id', Product.UpdateProduct)

//POST /product/deleteImage/:id
router.post('/deleteImage/:id', Product.DeleteImageFromProduct)

//POST /product/uploadImage/:id
router.post('/uploadImage/:id', Product.UploadImageToProduct)

//DELETE /product/deleteMany
router.delete('/deleteMany', Product.DeleteManyProduct)

//DELETE /product/:id
router.delete('/:id', Product.DeleteProduct)







module.exports = router;

