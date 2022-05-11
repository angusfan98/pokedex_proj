import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import PokemonDisplay from './PokemonDisplay'


function Pokedex() {
    const[pokemon_list, setAllPokemons] = useState([])
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

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
 
  function sort_pokemon(poke_arr){
    poke_arr.sort((a,b)=>(a.name > b.name)?1:-1)
  }


 useEffect(() => {
  get_pokemon()
 }, [])


const {isAuthenticated} = useAuth0();

  return (
    isAuthenticated && (
        <>
        <button onClick={()=>sort_pokemon(pokemon_list)}>sort</button>
        <div className="app-container">
        <div className="pokemon-container">
          <div className="all-container">
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
