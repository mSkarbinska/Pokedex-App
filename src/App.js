import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonCard from './components/PokemonCard';
import * as ReactBootStrap from 'react-bootstrap'
import './App.css'

function App() {
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  const [pokemonsData, setPokemonsData] = useState([])
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
  }

  return (
    <div className="col-xs-1" align="center">
    <ReactBootStrap.Navbar className="justify-content-center">
      <img  src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"></img>
    </ReactBootStrap.Navbar>
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2">
        {pokemonsData.map((p, index)=>(
            <PokemonCard  
                key = {index} 
                name={p.name} 
                id = {index} 
                img = {p.sprites.other.dream_world.front_default} type={p.types[0].type.name}> 
            </PokemonCard>
        ))}
      </div>
      
    </div>

    { !loading ? <ReactBootStrap.Spinner animation="border"/>:
    <ReactBootStrap.Button variant="primary"  style = {{margin: '2rem'}} onClick={() =>{
      getPokemons() 
      setLoading(false)}}>Load more</ReactBootStrap.Button>}
    
    
  </div>
    
  );
}

export default App;
