import { useState, useEffect } from 'react';
import PokemonsService from '../utils/PokemonsService';
import DOMPurify from "isomorphic-dompurify";

const GenerationFilter = ({ onGenerationSelect }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeGen, setActiveGen] = useState(null);

  const generations = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const defaultGeneration = 1;

  const handleClick = async (gen) => {
    setLoading(true);
    setError(null);
    setActiveGen(gen);
    try {
      const speciesList = await PokemonsService.getPokemonByGeneration(gen);
      if (speciesList) {
        onGenerationSelect(speciesList);
      } else {
        throw new Error('No data returned');
      }
    } catch (err) {
      setError('Failed to load generation data');
      onGenerationSelect([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleClick(defaultGeneration);
  }, []);

  return (
    <>
     <div className='container d-flex justify-content-center'>
        {loading && <p>{DOMPurify.sanitize(`Loading generation `)}{activeGen} {DOMPurify.sanitize(`Pokémon...`)}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div className='container d-flex flex-wrap justify-content-center gap-3'>
        {generations.map((gen) => (
          <button
            key={gen}
            id='generations-filter-btn'
            className='btn shadow-lg text-center'
            onClick={() => handleClick(gen)}
            style={{
              
              backgroundColor: activeGen === gen ? '#D2042D' : 'whitesmoke',
              color: activeGen === gen ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {DOMPurify.sanitize(`Gen `)}{gen}
          </button>
        ))}
      </div>
    </>
  );
};

export default GenerationFilter;
