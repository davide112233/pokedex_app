import { useState } from 'react';
import PokemonList from './PokemonList';
import PokemonInfo from './PokemonInfo';
import SearchBar from './SearchBar';

const PokemonDashboard = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div
      className="container-fluid d-flex flex-column p-4"
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div
        className="d-flex flex-xl-row flex-column-reverse justify-content-xl-between justify-content-center gap-xl-0 gap-3"
        style={{ flex: 1 }}
      >
        <PokemonList onSelect={setSelectedPokemon} searchQuery={searchQuery} />
        <PokemonInfo selectedPokemon={selectedPokemon} />
      </div>
    </div>
  );
};

export default PokemonDashboard;
