const express = require('express');
const { userContoller } = require('../Controllers');
const { auth } = require('../Helpers/auth');
const router = express.Router();

router.get('/getAllUsers', userContoller.getAllUsers);
router.post('/registerUser', userContoller.registerUser);
router.post('/loginUser', userContoller.loginUser);
router.post('/keepLoginUser', auth, userContoller.keepLoginUser);
router.patch('/editStatus', userContoller.editStatus);
router.delete('/deleteUser', userContoller.deleteAccount);


module.exports = router;