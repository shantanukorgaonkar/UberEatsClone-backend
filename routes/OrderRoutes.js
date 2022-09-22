const express = require('express');
const {getOrders,addOrder}=require('../controllers/OrderController')
const router = express.Router();
const { VerifyAuth } = require('../middleware/auth');


router.get('/',VerifyAuth, getOrders);
router.post('/',VerifyAuth, addOrder);

module.exports = router 