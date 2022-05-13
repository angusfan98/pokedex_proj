import React from 'react'
import './display.css'
import Axios from "axios";

export var arr = [];

function get_data(id){
   Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
       (response)=>{
       arr = [response.data.forms[0].name,response.data.stats[1].base_stat,response.data.stats[2].base_stat,response.data.types[0].type.name]
       });
    return arr
}

const PokemonDisplay = ({ id, image, name, type}) => {
    const style = type + " thumb-container";
    return (
        <div className={style} onClick={() => (get_data(id))}>
            <div className="number"><small>#{id}</small></div>
            <img src={image} alt={name} />
            <div className="detail-wrapper">
                <h3>{name}</h3>
            </div>
        </div>
    )
}


export default PokemonDisplay