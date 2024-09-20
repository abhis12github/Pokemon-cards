import React, { useEffect, useState } from "react";
import './App.css';
import Card from './components/Card';
import { FloatButton } from 'antd';
import { useNavigate, useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const limit = 20;  

  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();

  const offset = parseInt(query.get('offset')) || 0;
  const searchQuery = query.get('search') || '';

  // Fetch Pokémon data for the current page
  const fetchPokemonData = async (offset) => {
    const pokemonPromises = [];
    for (let i = offset + 1; i <= offset + limit; i++) {
      pokemonPromises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json()));
    }
    const pokemonData = await Promise.all(pokemonPromises);
    setPokemons(pokemonData);
    setSearchResult(null); 
  };


  useEffect(() => {
    if (searchQuery) {
      handleSearchFromURL(searchQuery); 
    } else {
      fetchPokemonData(offset);
    }
  }, [offset, searchQuery]);


  const handleNext = () => {
    navigate(`/?offset=${offset + limit}`);
  };

  const handlePrev = () => {
    if (offset > 0) {
      navigate(`/?offset=${offset - limit}`);
    }
  };


  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/?search=${search.toLowerCase()}`);
  };


  const handleSearchFromURL = async (searchQuery) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResult(data);
        setPokemons([]); 
      } else {
        alert('Pokémon not found');
      }
    } catch (error) {
      alert('Error fetching Pokémon');
    }
  };

  return (
    <div className="container mx-auto mt-4 mb-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-5 w-[100%]">
        <p className="font-Heading text-2xl font-semibold text-gray-700">Pokemon</p>
        <form onSubmit={handleSearch} className="flex space-x-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pokémon"
            className="font-Heading rounded-3xl pl-5 text-gray-500 border-none outline-none focus:outline-none focus:border-none text-sm p-1 shadow-sm transition duration-300 ease-in-out"
          />
          <button
            type="submit"
            className="text-blackfocus:outline-none hover:scale-125 rounded-[100%] px-1 py-1 transition duration-300 ease-in-out"
          >
            <i className="fa-solid fa-magnifying-glass text-lg"></i>
          </button>
        </form>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  ">

        {!searchResult && (
          <FloatButton
            disabled={offset === 0}
            onClick={handlePrev}
            style={{
              position: 'fixed',
              top: '50%',
              left: '1%',
              opacity: offset === 0 ? 0.5 : 1,
              cursor: offset === 0 ? 'not-allowed' : 'pointer',
            }}
            icon={<i className="fa-solid fa-chevron-left"></i>}
          />
        )}

     
        {searchResult ? (
          <Card key={searchResult.id} pokemon={searchResult} />
        ) : (
          pokemons.map(pokemon => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </div>

   
      {!searchResult && (
        <FloatButton
          onClick={handleNext}
          style={{
            position: 'fixed',
            top: '50%',
            right: '1%'
          }}
          icon={<i className="fa-solid fa-chevron-right"></i>}
        />
      )}
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </Router>
);

export default WrappedApp;

