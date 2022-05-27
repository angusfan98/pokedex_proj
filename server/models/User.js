const mongoose = require('mongoose')

const User = new mongoose.Schema({
    userEmail:{
        type:String,
        required:true,
    },
})

const wat_2 = mongoose.model("user", User);
module.exports = wat_2;