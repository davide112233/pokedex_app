import { useState } from 'react';
import SearchBar from './SearchBar';
import PokemonFlex from './PokemonFlex';
import GenerationFilter from './GenerationFilter';

const PokedexFlexView = ({ spriteMode }) => {
    const [speciesList, setSpeciesList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="container d-flex flex-column mt-xl-3 mt-5" style={{ height: '100vh', overflow: 'hidden' }}>
            <GenerationFilter onGenerationSelect={setSpeciesList} />
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <PokemonFlex
                speciesList={speciesList}
                onSelect={setSelectedPokemon}
                searchQuery={searchQuery}
                spriteMode={spriteMode}
                selectedPokemon={selectedPokemon}
            />
        </div>
    );
};

export default PokedexFlexView;
