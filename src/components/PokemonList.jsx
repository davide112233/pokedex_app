import { useState, useEffect } from "react";
import PokemonsService from "../utils/PokemonsService";
import DOMPurify from "isomorphic-dompurify";

const PokemonList = ({ onSelect, searchQuery, spriteMode, selectedPokemon, speciesList }) => {
  const [pokemons, setPokemons] = useState([]);

  const selectedPokemonId = selectedPokemon?.id;

  useEffect(() => {
    const fetchPokemonsFromSpecies = async () => {
      if (!speciesList || speciesList.length === 0) {
        setPokemons([]);
        return;
      }

      const failedNames = [];

      const detailedData = await Promise.all(
        speciesList.map(async (species) => {
          const name = species.name;
          const data = await PokemonsService.getPokemon(DOMPurify.sanitize(name));
          if (!data) {
            failedNames.push(name);
            return null;
          }
          return {
            id: data.id,
            name: data.name,
            image:
              spriteMode === 'home_front_default'
                ? data.sprites.other?.home?.front_default || data.sprites.front_default
                : data.sprites.front_default,
            type: data.types[0]?.type.name,
            fullData: data,
          };
        })
      );

      setPokemons(detailedData.filter(Boolean));
      console.warn('Failed to fetch data for:', failedNames);
    };

    fetchPokemonsFromSpecies();
  }, [speciesList, spriteMode]);

  const filteredPokemons = pokemons.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      id="pokemon-list"
      className="container mt-xl-3"
      style={{ overflowY: 'auto', height: 'calc(100vh - 9rem)' }}
    >
      <ul className="list-group list-group-flush mt-xl-3">
        {filteredPokemons.map((pokemon) => (
          <li
            id="pokemon-list-item"
            className={`list-group-item d-flex align-items-center ${selectedPokemonId === pokemon.id ? 'selected-pokemon' : ''}`}
            key={pokemon.id}
            style={{ cursor: 'pointer' }}
            onClick={() => onSelect(pokemon.fullData)}
          >
            <img
              src={DOMPurify.sanitize(pokemon.image)}
              alt={DOMPurify.sanitize(pokemon.name)}
              className="me-3"
              style={{ width: '50px', height: '50px' }}
            />
            <span className="text-capitalize">{DOMPurify.sanitize(pokemon.name)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
