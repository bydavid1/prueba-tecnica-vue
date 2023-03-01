<template>
  <a-table :columns="columns" :dataSource="countriesFormatted" style="margin-top: 20px;">
    <template #flag-column="{ text: flag }">
      <a-image :src="flag" :width="100"/>
    </template>
    <template #actions="{ record }">
      <a @click="viewCountry(record.code)">View</a>
    </template>
  </a-table>
  <a-modal v-model:visible="visible" title="Información" @ok="handleOk">
    <template v-if="countryDetail != null">
      <h2>{{ countryDetail.name }}</h2>
      <a-row :gutter="16">
        <a-col :span="10">
          <h4>Bandera</h4>
          <a-image :src="countryDetail.flag" :width="150"/>
        </a-col>
        <a-col :span="14">
          <h3>Información</h3>
          <p><b>Nombre común:</b> {{ countryDetail.commonName }}.</p>
          <p><b>Capital:</b> {{ countryDetail.capital }}.</p>
          <p><b>Region:</b> {{ countryDetail.region }}.</p>
          <p><b>Codigo:</b> {{ countryDetail.code }}.</p>
          <p><b>Población:</b> {{ countryDetail.population }}</p>
          <p><b>Area:</b> {{ countryDetail.area }}</p>
          <p><b>Población:</b> {{ countryDetail.population }}</p>
        </a-col>
      </a-row>
    </template>
  </a-modal>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Image, Table, Modal, Row, Col } from 'ant-design-vue';

export default {
  name: 'CountriesTable',
  components: {
    'a-table': Table,
    'a-image': Image,
    'a-modal': Modal,
    'a-row': Row,
    'a-col': Col,
  },
  setup() {
    const store = useStore();
    const visible = ref(false);
    const columns = [
      {
        title: 'Numero',
        dataIndex: 'key',
        key: 'key',
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
        key: index + 1,
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
        commonName: country.name.common,
        capital: country.capital[0],
        region: country.region,
        population: country.population,
        area: country.area,
        code: country.cioc ?? country.cca3
      }
    })

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

    onMounted(() => {
      store.dispatch('fetchCountries');
    });

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
