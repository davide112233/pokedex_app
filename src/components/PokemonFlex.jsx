import { useState, useEffect } from "react";
import PokemonsService from "../utils/PokemonsService";
import DOMPurify from "isomorphic-dompurify";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from 'bootstrap';
import typeColors from "../utils/typeColors";

const PokemonFlex = ({ onSelect, searchQuery, spriteMode, speciesList }) => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

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

  const filtered = pokemons.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon.fullData);
    const modal = new Modal(document.getElementById('pokemonModal'));
    modal.show();
  };

  return (
    <>
      <div
        id="pokemon-flex"
        className="container d-flex flex-wrap justify-content-xl-start justify-content-center gap-3 mt-xl-3 mt-5"
        style={{
          overflowY: 'auto',
          height: 'calc(100vh - 15rem)',
        }}
      >
        {filtered.map((pokemon) => {
          const bgColor = typeColors[pokemon.type] || '#ddd';

          return (
            <div
              className="card pokemon-card mb-3"
              style={{ backgroundColor: bgColor, cursor: 'pointer' }}
              key={pokemon.id}
              onClick={() => openModal(pokemon)}
            >
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

      <div
        className="modal fade"
        id="pokemonModal"
        tabIndex="-1"
        aria-labelledby="pokemonModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div
            className="modal-content text-white"
            style={{
              backgroundColor: selectedPokemon ? typeColors[selectedPokemon.types[0].type.name] : '#fff'
            }}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="pokemonModalLabel">
                {selectedPokemon?.name && DOMPurify.sanitize(selectedPokemon.name.toUpperCase())} #{selectedPokemon?.id}
              </h1>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedPokemon && (
                <>
                  <div className="text-center mb-3">
                    <img
                      src={DOMPurify.sanitize(
                        spriteMode === 'home_front_default'
                          ? selectedPokemon.sprites?.other?.home?.front_default || selectedPokemon.sprites?.front_default
                          : selectedPokemon.sprites?.front_default
                      )}
                      alt={DOMPurify.sanitize(selectedPokemon.name)}
                      style={{ width: '100px', height: '100px' }}
                    />
                  </div>
                  <p><strong>{DOMPurify.sanitize(`Height: `)}</strong> {DOMPurify.sanitize(selectedPokemon.height.toString())}</p>
                  <p><strong>{DOMPurify.sanitize(`Weight: `)}</strong> {DOMPurify.sanitize(selectedPokemon.weight.toString())}</p>
                  <p><strong>{DOMPurify.sanitize(`Type: `)}</strong> {selectedPokemon.types.map(t => DOMPurify.sanitize(t.type.name)).join(', ')}</p>
                  <p><strong>{DOMPurify.sanitize(`Abilities: `)}</strong> {selectedPokemon.abilities.map(a => DOMPurify.sanitize(a.ability.name)).join(', ')}</p>
                  <div>
                    <strong>{DOMPurify.sanitize(`Stats: `)}</strong>
                    <ul className="mb-0">
                      {selectedPokemon.stats.map((stat, i) => (
                        <li key={i}>
                          {DOMPurify.sanitize(stat.stat.name)}: {stat.base_stat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonFlex;
