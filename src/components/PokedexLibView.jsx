import { useState } from 'react';
import PokemonList from './PokemonList';
import PokemonInfo from './PokemonInfo';
import SearchBar from './SearchBar';
import GenerationFilter from './GenerationFilter';

const PokedexLibView = ({ spriteMode }) => {
  const [speciesList, setSpeciesList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div
      className="container-fluid d-flex flex-column mt-xl-3 mt-5"
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      <GenerationFilter onGenerationSelect={setSpeciesList} />
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div
        className="d-flex flex-xl-row flex-sm-row flex-column-reverse justify-content-xl-between justify-content-center gap-xl-0 gap-3"
      >
        <PokemonList
          speciesList={speciesList}
          onSelect={setSelectedPokemon}
          searchQuery={searchQuery}
          spriteMode={spriteMode}
          selectedPokemon={selectedPokemon}
        />
        <PokemonInfo selectedPokemon={selectedPokemon} spriteMode={spriteMode} />
      </div>
    </div>
  );
};

export default PokedexLibView;
