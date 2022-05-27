import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import PokemonDisplay from './PokemonDisplay'
import PokemonCard from './PokemonCard'
import { featuredPokemon } from './PokemonDisplay'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function Pokedex() {
  const [pokemon_list, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=898')
  const [tmp, settmp] = useState([[
    'bulbasaur',
    1,
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    45,
    49,
    49,
    65,
    65,
    45,
    69,
    7,
    'overgrow',
    'chlorophyll',
    'grass'
  ]])

  const get_pokemon = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)

    function createPokemonObject(results) {
      results.forEach(async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()
        setAllPokemons(currentList => [...currentList, data])
      })
    }
    createPokemonObject(data.results)

  }
  

  function set_tmp() {
    settmp([featuredPokemon])
  }
  function sort_pokemon(poke_arr) {
    poke_arr.sort((a, b) => (a.name > b.name) ? 1 : -1)
  }

useEffect(() => {
  get_pokemon()
  }, [])

  const { isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <>
        <Button onClick={() => sort_pokemon(pokemon_list)}>sort</Button>
        <div className="all-container">
          <div className="pokemon-container" onClick={() => set_tmp()}>
            
            {pokemon_list.map((pokemonStats, index) =>
              
              <PokemonDisplay
                key={index}
                id={pokemonStats.id}
                image={pokemonStats.sprites.front_default}
                name={pokemonStats.name}
                type={pokemonStats.types[0].type.name}
              />)}

          </div>
          <div className>
            <PokemonCard
              name={tmp[0][0]}
              id={tmp[0][1]}
              image={tmp[0][2]}
              hp={tmp[0][3]}
              atk={tmp[0][4]}
              def={tmp[0][5]}
              spAtk={tmp[0][6]}
              spDef={tmp[0][7]}
              spd={tmp[0][8]}
              weight={tmp[0][9]}
              height={tmp[0][10]}
              abilityOne={tmp[0][11]}
              abilityTwo={tmp[0][12]}
              type={tmp[0][13]}
            />
          </div>
        </div>
      </>
    )
  );
}

export default Pokedex
