const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const ProductType = new Schema({
    name: String,
    id_type:Number,
    id_put:Number,
},{timestamps: true});
const productTypes = mongoose.model('type_product', ProductType);

module.exports=productTypes;