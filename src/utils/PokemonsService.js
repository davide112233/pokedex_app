import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

class PokemonsService {
  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
    });
  }

  /**
   * Fetch a Pokémon by name or ID
   * @param {string|number} identifier - Pokémon name (e.g. "ditto") or ID (e.g. 132)
   * @returns {Promise<Object|null>} - Full Pokémon object or null if failed
   */
  async getPokemon(identifier) {
    try {
      const response = await this.api.get(`/pokemon/${identifier}`);
      return response.data;
    } catch (error) {
      console.warn(`Warning: Could not fetch Pokémon "${identifier}": ${error.message}`);
      return null;
    }
  }

  /**
   * Fetch a list of Pokémon with pagination
   * @param {number} limit - Number of Pokémon per page
   * @param {number} offset - Offset for pagination
   * @returns {Promise<Object|null>} - Object with results or null if failed
   */
  async getPokemonList(limit = 1302, offset = 0) {
    try {
      const response = await this.api.get(`/pokemon?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (error) {
      console.warn('Warning: Could not fetch Pokémon list:', error.message);
      return null;
    }
  }

  /**
   * Fetch all available Pokémon (full base Pokédex entries)
   * @returns {Promise<Array>} - Array of { name, url }
   */
  async getAllAvailablePokemon() {
    try {
      const response = await this.api.get(`/pokemon?limit=100000&offset=0`);
      return response.data.results; // Array of { name, url }
    } catch (error) {
      console.warn('Warning: Could not fetch full Pokémon list:', error.message);
      return [];
    }
  }

  /**
   * Fetch a Pokémon's species info
   * @param {string|number} identifier - Pokémon name or ID
   * @returns {Promise<Object|null>}
   */
  async getPokemonSpecies(identifier) {
    try {
      const response = await this.api.get(`/pokemon-species/${identifier}`);
      return response.data;
    } catch (error) {
      console.warn(`Warning: Could not fetch species for Pokémon "${identifier}": ${error.message}`);
      return null;
    }
  }

  /**
   * Fetch a Pokémon's encounter locations
   * @param {string|number} identifier - Pokémon name or ID
   * @returns {Promise<Array|null>}
   */
  async getEncounters(identifier) {
    try {
      const response = await this.api.get(`/pokemon/${identifier}/encounters`);
      return response.data;
    } catch (error) {
      console.warn(`Warning: Could not fetch encounters for Pokémon "${identifier}": ${error.message}`);
      return null;
    }
  }

  /**
   * Fetch Pokémon by generation
   * @param {number|string} generationId - Generation ID (1–9)
   * @returns {Promise<Array|null>} - Array of Pokémon species (name & URL)
   */
  async getPokemonByGeneration(generationId) {
    try {
      const response = await this.api.get(`/generation/${generationId}`);
      return response.data.pokemon_species; // Array of { name, url }
    } catch (error) {
      console.warn(`Warning: Could not fetch generation ${generationId}: ${error.message}`);
      return null;
    }
  }

  /**
   * Convert a list of species into full Pokémon objects, skipping failures
   * @param {Array} speciesList - Array of { name, url }
   * @param {string} spriteMode - 'home_front_default' or default
   * @returns {Promise<Array>} - Array of Pokémon data (id, name, image, type, fullData)
   */
  async getPokemonFromSpeciesList(speciesList, spriteMode = 'default') {
    const results = [];

    for (const species of speciesList) {
      const name = species.name;
      const data = await this.getPokemon(name);

      if (!data) {
        continue;
      }

      results.push({
        id: data.id,
        name: data.name,
        image:
          spriteMode === 'home_front_default'
            ? data.sprites.other?.home?.front_default || data.sprites.front_default
            : data.sprites.front_default,
        type: data.types[0]?.type.name,
        fullData: data,
      });
    }

    return results;
  }
}

export default new PokemonsService();
