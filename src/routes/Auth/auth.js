const express = require('express');
const { register, login } = require('../../controller/auth/auth.controller');
const { validateRegister, validateLogin } = require('../../validators/auth');

const router= express();

router.post('/register',validateRegister, register)
router.post('/login', validateLogin,login)

module.exports=router