const mongoose = require('mongoose')

const PokeSchema = new mongoose.Schema({
    userEmail:{
        type:String,
        required:true,
    },
    pokeName:{
        type: String,
        required:true,
    },
    pokeImg:{
        type: String,
        required:true,
    },
})

const wat = mongoose.model("caught_pokemon", PokeSchema);
module.exports = wat;