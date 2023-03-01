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
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Image, Table } from 'ant-design-vue';

export default {
  name: 'CountriesTable',
  components: {
    'a-table': Table,
    'a-image': Image,
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
      }))
    })
    
    const viewCountry = (code) => {
      console.log(code);
    };
    
    return {
      columns,
      countriesFormatted,
      viewCountry,
    };
  },
};
</script>