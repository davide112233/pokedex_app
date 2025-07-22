import { useState } from 'react';
import PokemonList from './PokemonList';
import PokemonInfo from './PokemonInfo';
import SearchBar from './SearchBar';

const PokedexLibView = ({ spriteMode }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div
      className="container-fluid d-flex flex-column mt-xl-3 mt-5"
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div
        className="d-flex flex-xl-row flex-sm-row flex-column-reverse justify-content-xl-between justify-content-center gap-xl-0 gap-3"
      >
        <PokemonList onSelect={setSelectedPokemon} searchQuery={searchQuery} spriteMode={spriteMode} />
        <PokemonInfo selectedPokemon={selectedPokemon} spriteMode={spriteMode} />
      </div>
    </div>
  );
};

export default PokedexLibView;
