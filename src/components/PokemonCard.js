import React from 'react'

export default function PokemonCard({name, type, img, id}) {
  return (
      <div>
            {name}
            {id}
            <img alt={name} src ={img} />
            {type}
      </div>

  )
}
