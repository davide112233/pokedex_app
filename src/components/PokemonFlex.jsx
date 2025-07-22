import { useState, useEffect } from "react";
import PokemonsService from "../utils/PokemonsService";
import DOMPurify from "isomorphic-dompurify";

const typeColors = {
  fire: '#f08030',
  water: '#6890f0',
  grass: '#78c850',
  electric: '#f8d030',
  psychic: '#f85888',
  normal: '#a8a878',
  ground: '#e0c068',
  rock: '#b8a038',
  bug: '#a8b820',
  ghost: '#705898',
  poison: '#a040a0',
  dragon: '#7038f8',
  ice: '#98d8d8',
  fighting: '#c03028',
  dark: '#705848',
  steel: '#b8b8d0',
  fairy: '#ee99ac'
};

const PokemonFlex = ({ onSelect, searchQuery, spriteMode }) => {
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
              image:
                spriteMode === 'home_front_default'
                  ? data.sprites.other?.home?.front_default || data.sprites.front_default
                  : data.sprites.front_default,
              type: data.types[0]?.type.name,
              fullData: data
            };
          })
        );
        setPokemons(detailedData);
      }
    };
    fetchPokemonList();
  }, [spriteMode]);

  const filteredPokemons = pokemons.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      id="pokemon-flex"
      className="container d-flex flex-wrap justify-content-xl-start justify-content-center gap-5 mt-xl-3 mt-5"
      style={{
        overflowY: 'auto',
        height: 'calc(100vh - 9rem)',
      }}
    >
      {filteredPokemons.map((pokemon) => {
        const bgColor = typeColors[pokemon.type] || '#ddd';

        return (
          <div className="card pokemon-card" style={{ backgroundColor: bgColor }} key={pokemon.id}>
            <img
              className="card-img-top"
              src={DOMPurify.sanitize(pokemon.image)}
              alt={DOMPurify.sanitize(pokemon.name)}
              style={{ width: '10rem', height: '10rem' }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PokemonFlex;

/*
 {filteredPokemons.map((pokemon) => (
        <div className="card pokemon-card" style={{ backgroundColor: bgColor }} key={pokemon.id}>
            <img className="card-img-top" src={DOMPurify.sanitize(pokemon.image)} alt={DOMPurify.sanitize(pokemon.name)} style={{ width: '10rem', height: '10rem' }} />
        </div>
      ))}
*/

/*
<ul className="list-group list-group-flush mt-xl-3">
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
*/
