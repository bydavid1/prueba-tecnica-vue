<template>
  <div class="container">
    <filter-section/>
    <countries-table/>
  </div>
</template>

<script>
import FilterSection from './components/FilterSection.vue'
import CountriesTable from './components/CoutriesTable.vue'

export default {
  name: 'app',
  components: {
    'countries-table': CountriesTable,
    'filter-section': FilterSection
  },
};
</script>

<style scoped>
  .container {
    max-width: 1024px;
    margin: 0 auto;
  }
</style>