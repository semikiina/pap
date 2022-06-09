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
router.post('/updateState/:id',Auth, SAuth, Product.UpdateProductState)

//POST /product/upd/:id
router.post('/upd/:id', Auth, SAuth, Product.UpdateProduct)

//POST /product/restore/:id
router.post('/restore/:id',  Auth, SAuth, Product.RestoreProduct)

//DELETE /product/deleteMany
router.delete('/deleteMany', Auth, SAuth, Product.DeleteManyProduct)








module.exports = router;

