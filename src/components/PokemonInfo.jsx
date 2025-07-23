import DOMPurify from "isomorphic-dompurify";
import typeColors from "../utils/typeColors";

const PokemonInfo = ({ selectedPokemon, spriteMode }) => {
  if (!selectedPokemon) return null;

  const {
    name,
    id,
    height,
    weight,
    sprites,
    types,
    abilities,
    stats
  } = selectedPokemon;

  const mainType = types[0]?.type?.name || 'normal';
  const bgColor = typeColors[mainType] || '#ddd';

  const imageSrc =
    spriteMode === 'home_front_default'
      ? sprites?.other?.home?.front_default || sprites?.front_default
      : sprites?.front_default;

  return (
    <div
      className="container d-flex flex-column justify-content-start p-3 mt-xl-3"
      style={{
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
        maxHeight: '100vh',
        overflowY: 'auto',
      }}
    >
      <div
        id="pokemon-info"
        className="card text-white"
        style={{ backgroundColor: bgColor }}
      >
        <div className="card-header">
          <h4 className="text-capitalize text-start mt-2">{DOMPurify.sanitize(name)} (#{id})</h4>
        </div>
        <img
          src={DOMPurify.sanitize(imageSrc)}
          alt={DOMPurify.sanitize(name)}
          className="card-img-top mx-auto"
          style={{ width: '100px', height: '100px' }}
        />
        <div className="card-body" style={{ backgroundColor: bgColor }}>
          <p><strong>{DOMPurify.sanitize(`Height: `)}</strong> {DOMPurify.sanitize(height.toString())}</p>
          <p><strong>{DOMPurify.sanitize(`Weight: `)}</strong> {DOMPurify.sanitize(weight.toString())}</p>
          <p><strong>{DOMPurify.sanitize(`Type: `)}</strong> {types.map(t => DOMPurify.sanitize(t.type.name)).join(', ')}</p>
          <p><strong>{DOMPurify.sanitize(`Abilities: `)}</strong> {abilities.map(a => DOMPurify.sanitize(a.ability.name)).join(', ')}</p>
          <div>
            <strong>{DOMPurify.sanitize(`Stats: `)}</strong>
            <ul>
              {stats.map((stat, i) => (
                <li key={i}>
                  {DOMPurify.sanitize(stat.stat.name)}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonInfo;
