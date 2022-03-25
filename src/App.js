import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonCard from './components/PokemonCard';
import Modal from './components/Modal';
import * as ReactBootStrap from 'react-bootstrap'
import SearchBar from './components/SearchBar';
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  const [pokemonsData, setPokemonsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pokemonClicked, setPokemonClicked] = useState({})
  const [filters, setFilters] = useState({})

  useEffect(() => {
    getPokemons()
  }, [])

  const getPokemons = async () => {
    const pokemons = await fetchPokemons()
    getPokemonsData(pokemons.results.map(p => p.name))
  }

  const updateFilters = (searchParams) => {
    setFilters(searchParams)
  }

  const filterPokemons = (data) => {
    const filteredData = []

    if (!filters.name) {
      return data
    }

    for (const pokemon of data) {

      if (filters.name !== "" && pokemon.name !== filters.name.toLowerCase()) {
        continue;
      }

      if (filters.type !== "" && pokemon.types[0].type.name !== filters.typetoLowerCase()) {
        continue;
      }

      filteredData.push(pokemon)
    }

    return filteredData
  }

  const fetchPokemons = async () => {
    const res = await fetch(url)
    const data = await res.json()

    setUrl(data.next)

    return data
  }

  function getPokemonsData(pokemonsNames) {
    pokemonsNames.forEach(async pokemon => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      const data = await res.json()
      setPokemonsData(pokemonsData => [...pokemonsData, data])
    })
    setLoading(true)
  }

  return (
    <div className="justify-content-center" align="center">

      <ReactBootStrap.Navbar className="justify-content-center">
        <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="pokeapi logo"></img>
      </ReactBootStrap.Navbar>

      <SearchBar updateSearchParams={updateFilters} />

      <div className="d-flex justify-content-center flex-wrap" >
        {filterPokemons(pokemonsData).map((p, index) => (
          <PokemonCard
            key={index}
            name={p.name}
            id={index}
            onClick={() => {
              setIsOpen(true)
              setPokemonClicked(p)
            }}
            img={p.sprites.other.dream_world.front_default}
            type={p.types[0].type.name}>
          </PokemonCard>
        ))}
      </div>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} children={pokemonClicked}></Modal>

      {!loading ? <ReactBootStrap.Spinner animation="border" /> :
        <ReactBootStrap.Button variant="primary" style={{ margin: '2rem' }}
          onClick={() => { getPokemons(); setLoading(false); setFilters({})}}>
          Load more
        </ReactBootStrap.Button>}

    </div>

  );
}

export default App;
