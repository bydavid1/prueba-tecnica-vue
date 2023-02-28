<template>
  <div class="container">
    <h1>Búsqueda de resultados</h1>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="Buscar">
        <a-input v-model="query" placeholder="Escriba su búsqueda aquí" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">Buscar</a-button>
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :dataSource="dataSource" />
  </div>
</template>

<script>
import { reactive } from 'vue';
import { Form, Input, Button, Table } from 'ant-design-vue';

export default {
  components: {
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-button': Button,
    'a-table': Table,
  },
  setup() {
    const form = reactive({
      query: '',
    });

    const columns = [
      {
        title: 'Numero',
        dataIndex: 'result',
        key: 'result',
      },
      {
        title: 'Bandera',
        dataIndex: 'result',
        key: 'result',
      },
      {
        title: 'Nombre',
        dataIndex: 'result',
        key: 'result',
      },
      {
        title: 'Poblacion',
        dataIndex: 'result',
        key: 'result',
      },
    ];
    const dataSource = reactive([]);

    return {
      form,
      columns,
      dataSource
    };
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
}
</style>