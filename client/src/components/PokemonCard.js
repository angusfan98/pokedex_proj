import React from 'react'
import './display.css'

const PokemonCard = ({ name, id, image, hp, atk, def, spAtk, spDef, spd, weight, height, abilityOne, abilityTwo, type }) => {
    const style = "pokemonCard-container";
    return (
        <>
        <div className="card">
            <div className="number"><small>#{id}</small></div>
            <img id="currentPokemon" src={image} alt={name} />
            <div className="type-container">
            <h3>{name}</h3>
            <h5>{type}</h5>
            </div>
            <div className="details-container">
                <h5>ability#1:{abilityOne}</h5>
                <h5>ability#2:{abilityTwo}</h5>
                <h5>weight:{weight}</h5>
                <h5>height:{height}</h5>
            </div>
            <div className="progress">
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: hp}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">{hp}</div>
            </div>
            <br></br>
            <div className="progress">
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: atk}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">{atk}</div>
            </div>
            <br></br>
            <div className="progress">
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: def}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">{def}</div>
            </div>
            <br></br>
            <div className="progress">
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: spAtk}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">{spAtk}</div>
            </div>
            <br></br>
            <div className="progress">
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: spDef}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">{spDef}</div>
            </div>
            <br></br>
            <div className="progress">
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: spd}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">{spd}</div>
            </div>
        </div>
        </>
    )
}

export default PokemonCard