import { useState } from 'react';
import SearchBar from './SearchBar';
import PokemonFlex from './PokemonFlex';

const PokedexFlexView = ({ spriteMode }) => {
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <>
            <div className='container d-flex flex-column mt-xl-3 mt-5' style={{ height: '100vh',  overflow: 'hidden' }}>
                <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                <PokemonFlex onSelect={setSelectedPokemon} searchQuery={searchQuery} spriteMode={spriteMode} />
            </div>
        </>
    );
}

export default PokedexFlexView;