const express = require('express');
const router = express.Router();
const ProductSchema = require('../model/products')
const ProductTypeSchema = require('../model/productTypes')
const FiterSchema = require('../model/filters')
const Client = require('./../core/client')



module.exports = router;