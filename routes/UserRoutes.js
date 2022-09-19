const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/UserController')
const { loginUser } = require('../controllers/UserController')
const { getLoggedInUserData } = require('../controllers/UserController');
const { VerifyAuth } = require('../middleware/auth');


router.post('/', registerUser);
router.get('/me', VerifyAuth, getLoggedInUserData);
router.post('/login', loginUser);

module.exports = router 