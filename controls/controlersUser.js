
const express = require('express');
const router = express.Router();
const Client = require('./../core/client')
const client=  new Client
router.get('/', async function (req, res) {
    res.redirect('/user/login')
})
router.get('/login', async function (req, res) {
    const viewContent = client.getViewMain('form')
        res.render('index',{viewContent})
})
module.exports = router