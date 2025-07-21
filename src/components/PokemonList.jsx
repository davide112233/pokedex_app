import { useState, useEffect } from "react";
import PokemonsService from "../utils/PokemonsService";
import DOMPurify from "isomorphic-dompurify";

const PokemonList = ({ onSelect, searchQuery }) => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const listData = await PokemonsService.getPokemonList(151);
      if (listData?.results) {
        const detailedData = await Promise.all(
          listData.results.map(async (pokemon) => {
            const data = await PokemonsService.getPokemon(DOMPurify.sanitize(pokemon.name));
            return {
              id: data.id,
              name: data.name,
              image: data.sprites.front_default,
              type: data.types[0]?.type.name,
              fullData: data
            };
          })
        );
        setPokemons(detailedData);
      }
    };
    fetchPokemonList();
  }, []);

  const filteredPokemons = pokemons.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      id="pokemon-list"
      className="container mb-xl-5 mt-xl-3"
      style={{
        overflowY: 'auto',
        maxHeight: '100vh',
      }}
    >
      <ul className="list-group list-group-flush">
        {filteredPokemons.map((pokemon) => (
          <li
            id="pokemon-list-item"
            className="list-group-item d-flex align-items-center"
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
            <span className="text-capitalize text-white">
              {DOMPurify.sanitize(pokemon.name)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
