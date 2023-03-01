import { createStore } from 'vuex';
import countriesModule from './modules/coutries.module';

export default createStore({
  modules: {
    countries: countriesModule,
  },
});