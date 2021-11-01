const express = require('express');
const router = express.Router();
const controlProduct = require('./controlersProduct')
const controlAdmin = require('./controlersAdmin')
const controlUser = require('./controlersUser')
const controlAjax = require('./controlersAjax')
router.use('/',controlProduct)
router.use('/ajaxGetData',controlAjax)
router.use('/admin',controlAdmin)
router.use('/user',controlUser)
module.exports = router