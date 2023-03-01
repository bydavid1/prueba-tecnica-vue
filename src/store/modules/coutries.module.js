import CountryService from '@/services/country'
import { notification } from 'ant-design-vue';

export default {
  state: {
    countries: [],
    suggestions: [],
    country: null
  },
  mutations: {
    setCountries(state, countries) {
      state.countries = countries;
    },
    setSuggestions(state, countries) {
      state.suggestions = countries;
    },
    setCountry(state, country) {
      state.country = country;
    },
  },
  actions: {
    async fetchCountries({ commit }) {
      try {
        const countries = await CountryService.all();
        commit('setCountries', countries.data);
      } catch (error) {
        notification.open({
          message: 'Error',
          description: `Ha ocurrido un error: ${error.message}`,
        });
      }
    },
    async viewCountry({ commit }, countryCode) {
      try {
        const country = await CountryService.view(countryCode);
        commit('setCountry', country.data[0]);
      } catch (error) {
        notification.open({
          message: 'Error',
          description: `Ha ocurrido un error: ${error.message}`,
        });
      }
      
    },
    async searchCountries({ commit }, query) {
      try {
        const countries = await CountryService.search(query);
        commit('setCountries', countries.data);
      } catch (error) {
        if (error.response?.data?.status != 404) {
          notification.open({
            message: 'Aviso',
            description: `Ha ocurrido un error: ${error.message}`,
          });
        } else {
          commit('setCountries', []);
        }
      }
    },
    async searchSuggestions({ commit }, query) {
      try {
        const countries = await CountryService.search(query);
        commit('setSuggestions', countries.data);
      } catch (error) {
        if (error.response?.data?.status != 404) {
          notification.open({
            message: 'Aviso',
            description: `Ha ocurrido un error: ${error.message}`,
          });
        } else {
          commit('setSuggestions', []);
        }
      }
    }
  },
};