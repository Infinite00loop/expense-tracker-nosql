const express = require('express');

const router = express.Router();

const resetController = require('../controllers/reset');

router.post('/newpassword', resetController.newpassword);
router.post('/forgotpassword', resetController.forgotpassword);
router.get('/resetpassword/:uid', resetController.resetpassword);


module.exports = router;