// src/services/PokemonService.js
import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

class PokemonService {
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
            console.error(`Error fetching Pokémon "${identifier}":`, error.message);
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
            console.error('Error fetching Pokémon list:', error.message);
            return null;
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
            console.error(`Error fetching species for Pokémon "${identifier}":`, error.message);
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
            console.error(`Error fetching encounters for Pokémon "${identifier}":`, error.message);
            return null;
        }
    }
}

export default new PokemonService();
