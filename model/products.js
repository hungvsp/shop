const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Product = new Schema({
    name: String,
    price:Number,
    sl:Number,
    type:Number,
    id_put:Number,
    img:String,
    brand:String,
    rom:{type:Number},
    ram:{type:Number,defualt:0},
    hdd:{type:Number,defualt:0},
    ssd:{type:Number,defualt:0},
    lv_price:Number,
    Featured:Boolean,

},{timestamps: true});
const products = mongoose.model('product', Product);

module.exports=products;