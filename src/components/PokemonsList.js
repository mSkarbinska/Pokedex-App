import React from 'react'
import PokemonCard from './PokemonCard'

export default function PokemonsList({pokemons}) {
  return (
    <div>
        {pokemons.map((pokemon, index) => (
            // <div key = {p.id}>{p.types[0].type.name}</div>
            <PokemonCard key = {index} pokemon = {pokemon}/>
        ))}
    </div>
    
  )
}
