const express = require('express');




const router = express.Router();

const {logincontroller, signupcontroller}  = require('../controllers/usercontroller');



router.post('/login', logincontroller)


router.post('/signup', signupcontroller)


module.exports = router

