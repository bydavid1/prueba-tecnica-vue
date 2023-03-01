import CountryService from '@/services/country'

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
      const countries = await CountryService.all();
      commit('setCountries', countries.data);
    },
    async viewCountry({ commit }, countryCode) {
      const country = await CountryService.view(countryCode);
      commit('setCountry', country.data[0]);
    },
    async searchCountries({ commit }, query) {
      const countries = await CountryService.search(query);
      commit('setCountries', countries.data);
    },
    async searchSuggestions({ commit }, query) {
      const countries = await CountryService.search(query);
      commit('setSuggestions', countries.data);
    }
  },
};