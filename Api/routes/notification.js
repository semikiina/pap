const express = require('express');
const router = express.Router();
const Notification = require('../controllers/notification')
const SAuth = require('../middleware/storetoken');

//GET /
router.get('/', SAuth, Notification.getNotifications)

//GET /
router.get('/clear', SAuth, Notification.clearNotifications)

module.exports = router;
