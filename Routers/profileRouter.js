const express = require('express');
const { profileController } = require('../Controllers');
const { auth } = require('../Helpers/auth');
const router = express.Router()

router.get('/getAllProfile', profileController.getAllProfile);
router.get('/getProfileId', auth, profileController.getProfileId);
router.patch('/editProfile', profileController.editProfile);


module.exports = router;