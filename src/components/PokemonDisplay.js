import React from 'react'
import { useState } from 'react'
import Axios from "axios";
import './display.css'
import Axios from "axios";

export var featuredPokemon = [];

const PokemonDisplay = ({ id, image, name, type }) => {
    const style = type + " thumb-container";
    return (
        <div className={style} onClick={() => console.log(setPokemon(id))}>
            <div className="number"><small>#{id}</small></div>
            <img src={image} alt={name} />
            <div className="detail-wrapper">
                <h3>{name}</h3>
            </div>
        </div>
    )
}

function setPokemon(id) {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
        (response) => {
            featuredPokemon = [
                response.data.name,
                response.data.id,
                //img
                response.data.sprites.front_default,
                //hp
                response.data.stats[0].base_stat,
                //attak
                response.data.stats[1].base_stat,
                //defense
                response.data.stats[2].base_stat,
                //sp.attack
                response.data.stats[3].base_stat,
                //sp.defense
                response.data.stats[4].base_stat,
                //spd
                response.data.stats[5].base_stat,
                //weight
                response.data.weight,
                //height
                response.data.height,
                response.data.abilities[0].ability.name,
                response.data.abilities[1].ability.name,
                //type
                response.data.types[0].type.name]
        }
    )
    return featuredPokemon;
}

export default PokemonDisplay