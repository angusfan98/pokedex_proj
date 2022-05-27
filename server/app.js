const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 5000
const axios = require("axios");

app.use(cors())
app.use(express.json())

const PokeModel = require("./models/Pokemons")
const userModel = require("./models/User")

mongoose.connect('mongodb+srv://gooseuser:XPUpDywuqagJktdK@pokedexproj.akmrr.mongodb.net/pokemans?retryWrites=true&w=majority',{
  useNewUrlParser: true,
})

// app.get("/getbulbasaur", async (req, res) => {
//   try {
//       const response = await axios.get("https://pokeapi.co/api/v2/pokemon/1")
//       res.json({"name":response.data.name,"height":response.data.height})
//   }
//   catch (err) {
//       console.log(err)
//   }
// })

// function random_number(){
//   res = Math.floor(Math.random()*152)
//   return res
// }

// get_pokemon = (rand_num) => new Promise((resolve, reject)=>{
//   axios.get(`https://pokeapi.co/api/v2/pokemon/${rand_num}`)
//   .then(response => {
//        resolve({name:response.data.name, img:response.data.sprites.front_default})
//   })
//   .catch(error => {
//        reject(error)
//   });
// });

// let temp = get_pokemon(random_number()).then(response=>{console.log(response)})

app.post('/getpokemon', async (req,res)=>{
  const userEmail = req.body.userEmail
  const pokeName = req.body.pokeName
  const pokeImg = req.body.pokeImg
  const caught_pokemon = new PokeModel({userEmail: userEmail, pokeName: pokeName, pokeImg: pokeImg })

  try{
    await caught_pokemon.save();
    res.send("inserted data")
  } catch(err){
    console.log(err)
  }
})

app.post('/getUser', async (req,res)=>{
  console.log(req.body)
  const userEmail = req.body.userEmail
  const curr_user = new userModel({userEmail: userEmail})
  try{
    await curr_user.save();
    res.send("inserted data")
  } catch(err){
    console.log(err)
  }
})

app.get('/read', async (req,res)=>{
  userModel.find({},(err,result)=>{
    if (err){
      res.send(err)
    }
    var temp = result.slice(-1)[0].userEmail
    PokeModel.find({userEmail: temp},(err,result)=>{
      if (err){
        res.send(err)
      }
      res.send(result)
    })
  })
})


// app.get('/read', async (req,res)=>{
//   PokeModel.find({"_userEmail": "angusfan8@gmail.com"},(err,result)=>{
//     if (err){
//       res.send(err)
//     }
//     res.send(result)
//   })
// })





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
