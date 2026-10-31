<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th v-for="(header, ind) in this.tableConfig" :key="ind" scope="col">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, idx) in csvdata" :key="idx">
        <td v-for="(obj, i) in tableConfig" :key="i">{{ row[i] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    csvdata: {
      type: Array
    },
    tableConfig: {
      type: Array
    },
    filename: {
      type: String
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss"></style>
