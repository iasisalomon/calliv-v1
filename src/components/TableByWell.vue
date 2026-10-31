<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th v-for="(header, ind) in adjustedHeader" :key="ind" scope="col">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, idx) in Wells" :key="idx">
        <th>{{ row }}</th>
        <td v-for="(obj, i) in rawAdjusted[idx]" :key="i">{{ obj }}</td>
        <td>{{ adjustedAverage[idx] }}</td>
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
    adjustedHeader: {
      type: Array
    },
    Wells: {
      type: Array
    },
    rawAdjusted: {
      type: Array
    },
    adjustedAverage: {
      type: Array
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss"></style>
