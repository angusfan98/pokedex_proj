import React from 'react'
import './display.css'

const PokemonCard = ({ name, id, image, hp, atk, def, spAtk, spDef, spd, weight, height, abilityOne, abilityTwo, type }) => {
    const style = "pokemonCard-container";
    return (
        <div className={style}>
            <div className="number"><small>#{id}</small></div>
            <img id="currentPokemon" src={image} alt={name} />
            <div class="type-container">
            <h3>{name}</h3>
            <h5>{type}</h5>
            </div>
            <div class="details-container">
                <h5>ability#1:{abilityOne}</h5>
                <h5>ability#2:{abilityTwo}</h5>
                <h5>weight:{weight}</h5>
                <h5>height:{height}</h5>
            </div>
            <div className="stats-container">
                <h5>HP:{hp}</h5>
                <h5>ATK:{atk}</h5>
                <h5>DEF:{def}</h5>
                <h5>SP.ATK:{spAtk}</h5>
                <h5>SP.DEF:{spDef}</h5>
                <h5>SPEED:{spd}</h5>
            </div>
        </div>
    )
}

export default PokemonCard