const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Filter = new Schema({
    name: String,
    id_type:Number,
    ram:[Array],
    rom:[Array],
    brand:[Array],
},{timestamps: true});
const filters = mongoose.model('filter', Filter);

module.exports=filters;