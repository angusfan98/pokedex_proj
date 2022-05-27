import React from 'react'
import { useEffect,useState } from "react";
import Axios from "axios";
import { useAuth0 } from '@auth0/auth0-react'


const Catch = () => {
  const {user, isAuthenticated } = useAuth0();
  const [pokemon,setPokemon] = useState({
      userEmail:"",
      pokeName:"",
      pokeImg: "",
  })

  const [caught_list, set_caught_list] = useState([])

  const random_number = () =>{
      let res = Math.floor(Math.random()*152) + 1
      return res
  }

  const set_pokemon = () =>{
    var rand_num = random_number()
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${rand_num}`).then(
      (response)=>{
      setPokemon({
        userEmail:user.email,
        pokeName: response.data.name, 
        pokeImg: response.data.sprites.front_default, 
      });
    }
    );
  };

  const set_user = () =>{
    Axios.post("http://localhost:5000/getUser",{
      userEmail: user.email,
    })
  }

  const get_pokemon = () =>{
    Axios.get("http://localhost:5000/read").then((response)=>{
      set_caught_list(response.data)
    })
  }

  useEffect(()=>{
    get_pokemon()
  },[caught_list])

  useEffect(()=>{
    if (isAuthenticated === true){
      set_user()
    }
  },[])


  useEffect(() => {
    set_pokemon()
    }, [])

  const add_to_db = () =>{
    set_pokemon()
    Axios.post("http://localhost:5000/getpokemon",{
        userEmail:pokemon.userEmail,
        pokeName:pokemon.pokeName, 
        pokeImg:pokemon.pokeImg,
    })
    get_pokemon()
  }


  return (
    isAuthenticated && (
    <>
        <button onClick={()=>{add_to_db()}}>Catch</button>
        <h1>Caught Pokemon</h1>
        {caught_list.map((val,key)=>{
          return <div key={key}> <p>{val.pokeName}</p><img src={val.pokeImg}/></div>
        })}
    </>
  )
  )
}

export default Catch
