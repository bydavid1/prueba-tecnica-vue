<template>
  <div class="container">
    <a-row>
      <a-col :span="10">
        <a-auto-complete placeholder="Buscar país" option-label-prop="name" style="width: 100%" :options="suggestions" v-model:value="searchText"/>
      </a-col>
      <a-col :span="2">
        <a-button type="primary" @click="handleSearch">Buscar</a-button>
      </a-col>
    </a-row>
    <a-table :columns="columns" :dataSource="countriesFormatted">
      <template #flag-column="{ text: flag }">
        <a-image :src="flag" :width="100"/>
      </template>
      <template #actions="{ record }">
        <a @click="viewCountry(record.code)">View</a>
      </template>
    </a-table>
    <a-modal v-model:visible="visible" title="Información" @ok="handleOk">
      <template v-if="countryDetail != null">
        <a-image :src="countryDetail.flag" :width="150"/>
        <h2>{{ countryDetail.name }}</h2>
        <p>Codigo: {{ countryDetail.code }}.</p>
        <p>Población: {{ countryDetail.population }}</p>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { Image, Table, Button, Row, Col, Modal, AutoComplete } from 'ant-design-vue';

export default {
  name: 'CountriesTable',
  components: {
    'a-table': Table,
    'a-auto-complete': AutoComplete,
    'a-button': Button,
    'a-image': Image,
    'a-modal': Modal,
    'a-row': Row,
    'a-col': Col
  },
  setup() {
    const store = useStore();
    
    onMounted(() => {
      store.dispatch('fetchCountries');
    });
    
    const columns = [
      {
        title: 'Numero',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: 'Bandera',
        dataIndex: 'flag',
        key: 'flag',
        slots: { customRender: 'flag-column' },
      },
      {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Poblacion',
        dataIndex: 'population',
        key: 'population',
      },
      {
        title: 'Acciones',
        dataIndex: 'cioc',
        key: 'actions',
        slots: { customRender: 'actions' },
      },
    ];
    
    const countriesFormatted = computed(() => {
      const countries = store.state.countries.countries

      return countries.map((country, index) => ({
        key: index,
        flag: country.flags.svg ,
        name: country.name.official,
        population: country.population,
        code: country.ccn3
      }))
    })

    const countryDetail = computed(() => {
      const country = store.state.countries.country

      if (country == null) return null;

      return {
        flag: country.flags.svg ,
        name: country.name.official,
        population: country.population,
        code: country.cioc ?? country.cca3
      }
    })

    const suggestions = computed(() => {
      const countries = store.state.countries.suggestions;
      if (!countries) {
        return [];
      }
      
      return countries.map((country) => ({ value: country.name.official }));
    });

    const visible = ref(false);
    const searchText = ref('');

    const searchDelay = 1000;
    let searchTimer = null;

    watch(searchText, () => {
      clearTimeout(searchTimer);

      searchTimer = setTimeout(() => {
        if (searchText.value.length > 2) {
          store.dispatch('searchSuggestions', searchText.value);
        }
      }, searchDelay);
    });

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = () => {
      visible.value = false;
    };

    const handleSearch = () => {
      if (searchText.value === '') {
        store.dispatch('fetchCountries', searchText.value);
      } else {
        store.dispatch('searchCountries', searchText.value);
      }
    };
    
    const viewCountry = (code) => {
      store.dispatch('viewCountry', code);
      showModal();
    };
    
    return {
      columns,
      countriesFormatted,
      countryDetail,
      viewCountry,
      visible,
      handleOk,
      searchText,
      handleSearch,
      suggestions
    };
  },
};
</script>

<style scoped>
  .container {
    max-width: 1024px;
    margin: 0 auto;
  }
</style>