import CountryService from '@/services/country'

export default {
  state: {
    countries: [],
  },
  mutations: {
    setCountries(state, countries) {
      state.countries = countries;
    },
  },
  actions: {
    async fetchCountries({ commit }) {
      const countries = await CountryService.all();
      commit('setCountries', countries.data);
    },
  },
};