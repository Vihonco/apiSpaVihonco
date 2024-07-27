const express = require('express');

const user = require('./Auth/auth')
const banner = require('./admin/banner')

const router = express();



router.use(user)
router.use(banner)
module.exports = router;
