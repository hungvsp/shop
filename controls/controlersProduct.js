const express = require('express');
const router = express.Router();
const ProductSchema = require('../model/products')
const ProductTypeSchema = require('../model/productTypes')
const FiterSchema = require('../model/filters')
const Client = require('./../core/client')

router.get('/', async function (req, res) {
    const client = new Client
    try{
        //const data = await ProductSchema.find({Featured:true})
        const productAll = await ProductTypeSchema.aggregate([{
            $lookup: {
                from: "products", // collection name in db
                localField: "id_type",
                foreignField: "id_type",
                as: "products"
            }
        }])
        const dataSend = [] 
        productAll.forEach((data,i)=>{
            const arrRaw = []
            const arrProducts = []
            data.products.forEach((product,j)=>{
                if(product.Featured) arrRaw.push(product)
            })
            dataSend.push({name:data.name,slug:data.slug,products:arrRaw})
        })
        const viewContent = client.getViewMain('products',dataSend)
        res.render('index',{viewContent})

    }
    catch (e){
        console.log(e)
        res.send(' bi loi')
    }
  
})
router.get('/dtdd', async function (req, res) {
    const client = new Client
    const typeProduct=1

    try{
        const limit = 20
        const filter ={type:typeProduct}
        const products = await ProductSchema.find(filter).limit(limit)  
        const filters = await FiterSchema.find(filter)  
        const totalCount = await ProductSchema.countDocuments(filter)
        if(products){
            const dataSend = [{
                name:'DIEN THOAI',
                slug:'dtdt',
                filter:filters,
                ajax:true,
                products,
                totalCount:totalCount - limit
            }]
           const viewContent = client.getViewMain('products',dataSend,typeProduct)
           res.render('index',{viewContent})
        }     
        else res.send('k co sp') 
    }
    catch (e){
        res.send(e,'co loi')
    }
  
})
router.get('/laptop', async function (req, res) {
    const client = new Client
    const typeProduct=2
    try{
        const limit = 20
        const filter ={type:typeProduct}
        const products = await ProductSchema.find(filter).limit(limit)  
        const filters = await FiterSchema.find(filter)  
        const totalCount = await ProductSchema.countDocuments(filter)
        if(products){
            const dataSend = [{
                name:'LAP TOP',
                slug:'#',
                filter:filters,
                ajax:true,
                products,
                totalCount:totalCount - limit
            }]
           const viewContent = client.getViewMain('products',dataSend,typeProduct)
           res.render('index',{viewContent})
        }     
        else res.send('k co sp') 
    }
    catch (e){
        res.send(e,'co loi')
    }
  
})


module.exports = router;