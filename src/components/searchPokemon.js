import { useState } from "react";
import React, { Component }  from 'react';
import Axios from "axios";

const SearchPokemon = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
        name:"", 
        img: "", 
        hp: "",
        attack: "",
        defense: "",
        type: "",
  });

  const searchPokemon = () =>{
    var name = pokemonName.toLowerCase()
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(
      (response)=>{
      setPokemon({
        name:pokemonName, 
        img: response.data.sprites.front_default, 
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
      });
      setPokemonChosen(true);
    }
    );
  };
  return (
    <div className="App">
      <div className="TitleSection">
        <h1> Pokemon </h1>
        <input type="text" onChange={(event)=>{setPokemonName((event.target.value))}}></input>
        <button onClick={searchPokemon}>Search</button>
      </div>
      <div className='DisplaySection'>
        {!pokemonChosen?(<h1></h1>):(
        <>
        <h1>{pokemon.name}</h1>
        <img src={pokemon.img}></img>
        <h1>hp:{pokemon.hp}</h1>
        <h1>attack:{pokemon.attack}</h1>
        <h1>defense:{pokemon.defense}</h1>
        <h1>type:{pokemon.type}</h1>
        </>)}
      </div>
    </div>
  );
}

export default SearchPokemon