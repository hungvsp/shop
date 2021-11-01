
const express = require('express');
const router = express.Router();
const ProductSchema = require('../model/products')
const ProductTypeSchema = require('../model/productTypes')
const limit = 20
var totalCount = -1
router.post('/countFilter', async function (req, res) {
    try{
        const filter = JSON.parse(req.body.filter)
        const count = await ProductSchema.countDocuments(filter)
        totalCount = count
        res.json(count)
    }
    catch (e){
        console.log(e)
        res.json('_!_')
    }
  
})
router.post('/loadMore', async function (req, res) {
    
    try{
       if(totalCount == -1 ){
            const filter = JSON.parse(req.body.filter)
            totalCount = await ProductSchema.countDocuments(filter)
       }
        const filters = JSON.parse(req.body.filter)
        console.log(filters)
        const pageCurrent = req.body.pageCurrent ? req.body.pageCurrent : 1
        const skip = (pageCurrent-1)*limit
        const data = await ProductSchema.find(filters).sort({price: -1 }).limit(limit).skip(skip)
        var countReal =  totalCount-(pageCurrent*limit)
        res.json({status:1,data,countReal})
    }
    catch (e){
        console.log(e)
        res.json({status:0})
    }
})
module.exports = router