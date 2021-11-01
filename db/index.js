const mongoose = require('mongoose');
async function connect() {
    try {
      await mongoose.connect('mongodb://localhost:27017/dienmay');
      console.log('connected-> db');
    } catch (error) {  
      console.log('fail connect',error);
    }
  }
  module.exports={connect}