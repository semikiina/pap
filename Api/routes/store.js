const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store');
const Auth = require('../middleware/token');
const SAuth = require('../middleware/storetoken');


//GET /store/:id
router.get('/profile', Auth, SAuth, storeController.GetTheStore)

//GET /store/products
router.get('/products', Auth, SAuth, storeController.GetProductsByStore)

//GET /store/products
router.get('/rproducts', Auth, SAuth, storeController.GetRemovedProductsByStore)

//GET /store/orders
router.get('/orders', Auth, SAuth, storeController.StoreOrders)

//GET /store/verifyStoreEmail/:id
router.get('/verifyStoreEmail/:id', Auth, storeController.verifyEmail)

//GET /store/login/:id
router.get('/login/:id', Auth, storeController.Login)

//POST /store
router.post('/', Auth, storeController.NewStore)

//POST /store
router.post('/ordersLog', Auth, SAuth,  storeController.GetStoreOrdersChart)

//POST /store
router.post('/salesLog', Auth, SAuth,  storeController.GetStoreSalesChart)

//POST /store/confirmAccount/:email
router.post('/confirmAccount/:email', Auth, storeController.ConfirmAccount)

//POST /store/editStore
router.post('/editStore', Auth , SAuth, storeController.NewUpdateStore)

//POST /store/updateOrder/:id
router.post('/order/:id', Auth , SAuth, storeController.NewOrderState)

//POST /store/inviteCollaborator
router.post('/inviteCollaborator',  SAuth, storeController.InviteCollaborator)

//POST /store/confirmInvite/:token
router.post('/confirmInvite/:token',Auth, storeController.NewCollaborator)

//POST /store/editCollaborator/:id
router.post('/editCollaborator/:id', SAuth, storeController.EditCollaborator)

//POST /store/confirmInvite/:token
router.delete('/removeCollaborator/:id', SAuth, storeController.RemoveCollaborator)






module.exports = router;
