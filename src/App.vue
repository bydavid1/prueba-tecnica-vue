<template>
  <div>
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
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Image, Modal, Table } from 'ant-design-vue';

export default {
  name: 'CountriesTable',
  components: {
    'a-table': Table,
    'a-image': Image,
    'a-modal': Modal
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

    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = () => {
      visible.value = false;
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
    };
  },
};
</script>