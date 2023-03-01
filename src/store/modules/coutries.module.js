import CountryService from '@/services/country'

export default {
  state: {
    countries: [],
    country: null
  },
  mutations: {
    setCountries(state, countries) {
      state.countries = countries;
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
    }
  },
};