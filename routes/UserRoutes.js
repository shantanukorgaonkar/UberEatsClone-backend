const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/UserController')
const {loginUser} = require('../controllers/UserController')
const {getUserData} = require('../controllers/UserController')

router.post('/',registerUser);
router.get('/me',getUserData);
router.post('/login',loginUser);

module.exports = router 