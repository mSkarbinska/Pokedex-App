import { useState, useEffect } from 'react';

import PokemonCard from './components/PokemonCard';

function App() {
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  const [pokemonsData, setPokemonsData] = useState([])
  
  useEffect(() => {
    getPokemons()
  }, [])
  
  const getPokemons = async () => {
    const pokemons = await fetchPokemons()
    getPokemonsData(pokemons.results.map(p=>p.name))
  }
  
  const fetchPokemons = async () => {
    const res = await fetch(url)
    const data = await res.json()
    
    setUrl(data.next)

    return data
  }

  function getPokemonsData(pokemonsNames)  {
    pokemonsNames.forEach( async pokemon => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      const data =  await res.json()
      setPokemonsData( pokemonsData => [...pokemonsData, data])
    })
  }

  return (
    <div>
    <div>
      {pokemonsData.map((p, index)=>(
          <PokemonCard 
              key = {index} 
              name={p.name} 
              id = {index} 
              img = {p.sprites.other.dream_world.front_default} type={p.types[0].type.name}> 
          </PokemonCard>
      ))}
    </div>
    <button onClick={() => getPokemons()}>Load more pokemons</button>
    </div>
  );
}

export default App;
