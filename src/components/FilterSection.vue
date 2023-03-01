<template>
  <a-row type="flex" justify="center" :gutter="20">
    <a-col :sm="8" :lg="10">
      <a-auto-complete placeholder="Buscar país" option-label-prop="name" style="width: 100%" :options="suggestions" v-model:value="searchText"/>
    </a-col>
    <a-col :sm="4" :lg="2">
      <a-button type="primary" @click="handleSearch">Buscar</a-button>
    </a-col>
  </a-row>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { Button, Row, Col, AutoComplete } from 'ant-design-vue';

export default {
  name: 'filter-section',
  components: {
    'a-auto-complete': AutoComplete,
    'a-button': Button,
    'a-row': Row,
    'a-col': Col,
  },
  setup() {
    const store = useStore();

    const searchText = ref('');
    const searchDelay = 1000;
    let searchTimer = null;

    const handleSearch = () => {
      if (searchText.value === '') {
        fetchCountries();
      } else {
        searchCountries();
      }
    };

    const fetchCountries = () => {
      store.dispatch('fetchCountries');
    };

    const searchCountries = () => {
      store.dispatch('searchCountries', searchText.value);
    };

    const searchSuggestions = () => {
      if (searchText.value.length > 2) {
        store.dispatch('searchSuggestions', searchText.value);
      }
    };

    watch(searchText, () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(searchSuggestions, searchDelay);
    });

    const suggestions = computed(() => {
      const countries = store.state.countries.suggestions;
      if (!countries) {
        return [];
      }
      
      return countries.map((country) => ({ value: country.name.official }));
    });

    return {
      searchText,
      suggestions,
      handleSearch,
    };
  },
};
</script>