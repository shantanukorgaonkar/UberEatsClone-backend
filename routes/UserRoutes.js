const express = require('express');
const router = express.Router();
const { registerUser , loginUser,getLoggedInUserData,updateUserEmail,deleteUser,updateUserPassword} = require('../controllers/UserController');
const { VerifyAuth } = require('../middleware/auth');


router.post('/', registerUser);
router.get('/me', VerifyAuth, getLoggedInUserData);
router.post('/login', loginUser);
router.put('/me/email',VerifyAuth,updateUserEmail);
router.put('/me/password',VerifyAuth,updateUserPassword);
router.delete('/me',VerifyAuth,deleteUser);

module.exports = router 