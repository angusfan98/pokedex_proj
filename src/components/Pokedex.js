import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import PokemonDisplay from './PokemonDisplay'


function Pokedex() {
    const[allPokemons, setAllPokemons] = useState([])
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=12')

    const getAllPokemons = async () => {
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
    console.log(allPokemons)
  }

 useEffect(() => {
  getAllPokemons()
 }, [])

  const {isAuthenticated} = useAuth0();

  return (
    isAuthenticated && (
        <div className="app-container">
        <div className="pokemon-container">
          <div className="all-container">
            {allPokemons.map( (pokemonStats, index) => 
              <PokemonDisplay
                key={index}
                id={pokemonStats.id}
                image={pokemonStats.sprites.front_default}
                name={pokemonStats.name}
                type={pokemonStats.types[0].type.name}
              />)}
            
          </div>
            <button className="load-more" onClick={() => getAllPokemons()}>Load more</button>
        </div>
      </div>
    )
    );
}

export default Pokedex
