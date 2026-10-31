<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th v-for="(header, ind) in WellsUniqueCols" :key="ind" scope="col">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, idx) in WellsUniqueRows" :key="idx">
        <th>{{ row }}</th>
        <td v-for="(dat, i) in curveBy4[idx]" :key="i">{{ dat }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    WellsUniqueCols: {
      type: Array
    },
    WellsUniqueRows: {
      type: Array
    },
    curveBy4: {
      type: Array
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss"></style>

:WellsUniqueCols="WellsUniqueCols" :WellsUniqueRows="WellsUniqueRows"
:adjustedAverage="adjustedAverage"
