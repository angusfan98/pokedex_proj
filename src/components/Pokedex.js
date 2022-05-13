import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import PokemonDisplay from './PokemonDisplay'
import {arr} from './PokemonDisplay'
import './display.css'


function Pokedex() {
    const[pokemon_list, setAllPokemons] = useState([])
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
    const [tmp,settmp] = useState([arr])
    const get_pokemon = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)

    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
        setAllPokemons( currentList => [...currentList, data])
      })
    }
    createPokemonObject(data.results)

  }

  function set_tmp(){
    settmp([arr])
  }
 
  function sort_pokemon(poke_arr){
    poke_arr.sort((a,b)=>(a.name > b.name)?1:-1)
  }

useEffect(() => {
  get_pokemon()
  }, [])

 useEffect(() => {
  console.log(tmp)
 }, [tmp])


const {isAuthenticated} = useAuth0();
  return (
    isAuthenticated && (
        <>
        <button onClick={()=>sort_pokemon(pokemon_list)}>sort</button>
        <div>
        <h1>{tmp[0][0]}</h1>
        <h1>{tmp[0][1]}</h1>
        <h1>{tmp[0][2]}</h1>
        <h1>{tmp[0][3]}</h1>
        </div>
        <div className="app-container">
        <div className="pokemon-container">
          <div className="all-container" onClick={()=>set_tmp()}>
            {pokemon_list.map( (pokemonStats, index) => 
              <PokemonDisplay
                key={index}
                id={pokemonStats.id}
                image={pokemonStats.sprites.front_default}
                name={pokemonStats.name}
                type={pokemonStats.types[0].type.name}
              />)}
          </div>
            <button onClick={() => get_pokemon()}>↓</button>
        </div>
      </div>
      </>
    )
    );
}

export default Pokedex
