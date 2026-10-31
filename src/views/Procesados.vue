<template>
  <div class="container">
    <Navbar />
    <Nav
      :showactive="showactive"
      @datosUpdate="datosUpdate($event)"
      @netaUpdate="netaUpdate($event)"
      @linkUpdate="linkUpdate($event)"
    />
    <h1>{{ filename }}</h1>
    <ProcessedTable
      v-show="showactive[0]"
      :csvdata="csvdata"
      :tableConfig="tableConfig"
    />
    <TableByWell
      v-show="showactive[1]"
      :csvdata="csvdata"
      :tableConfig="tableConfig"
      :groupByCSV="groupByCSV"
      :adjustedHeader="adjustedHeader"
      :Wells="Wells"
      :rawAdjusted="rawAdjusted"
      :adjustedAverage="adjustedAverage"
    />
    <Matriz
      v-show="showactive[2]"
      :WellsUniqueCols="WellsUniqueCols"
      :WellsUniqueRows="WellsUniqueRows"
      :adjustedAverageBy4="adjustedAverageBy4"
    />
    <MatrizCero
      v-show="showactive[3]"
      :WellsUniqueCols="WellsUniqueCols"
      :WellsUniqueRows="WellsUniqueRows"
      :curveBy4="curveBy4"
    />
  </div>
</template>

<script>
import _ from "lodash";
import Navbar from "../components/Navbar";
import Nav from "../components/Nav";
import ProcessedTable from "../components/ProcessedTable";
import TableByWell from "../components/TableByWell";
import Matriz from "../components/Matriz";
import MatrizCero from "../components/MatrizCero";

var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export default {
  data() {
    return {
      /*** DATOS ORDENADOS Y FLUORESCENCIA NETA ***/
      loadedtoken: 0,
      showactive: [true, false, false],
      csvdata: [],
      filename: [],
      tableConfig: [],
      adjustedHeader: [
        "Well",
        "Lecture 1",
        "Lecture 2",
        "Lecture 3",
        "Average"
      ],
      Wells: [],
      groupByCSV: [],
      rawAdjusted: [],
      adjustedAverage: [],
      /*** MATRICES ***/
      WellsUniqueRows: [],
      WellsUniqueCols: [],
      adjustedAverageBy4: [],
      minimum: [],
      curve: [],
      curveBy4: []
    };
  },
  components: {
    Navbar,
    ProcessedTable,
    TableByWell,
    Nav,
    Matriz,
    MatrizCero
  },
  methods: {},
  created() {
    /*** DATOS ORDENADOS Y FLUORESCENCIA NETA ***/
    if (this.$route.params.data != undefined) {
      //file handshake
      this.filename = this.$route.params.data[0];
      this.tableConfig = this.$route.params.data[1];
      // sort and storage csv
      this.csvdata = this.$route.params.data[2].sort();
      localStorage.setItem("csvdata", JSON.stringify(this.csvdata));
      // sort and storage group by
      this.groupByCSV = groupBy(this.csvdata, 0);
      localStorage.setItem("groupByCSV", JSON.stringify(this.groupByCSV));
      //sort and storage wells
      this.Wells = Object.keys(this.groupByCSV);
      localStorage.setItem("Wells", JSON.stringify(this.Wells));
      //sort and storage raw adjusted values
      this.rawAdjusted = Object.entries(this.groupByCSV).map(e => {
        return e[1].map(f => {
          return f[2] - f[3];
        });
      });
      localStorage.setItem("rawAdjusted", JSON.stringify(this.rawAdjusted));
      //sort and storage averages
      this.adjustedAverage = this.rawAdjusted.map(e => {
        return (
          e.reduce((a, b) => {
            return a + b;
          }) / e.length
        );
      });
      localStorage.setItem(
        "adjustedAverage",
        JSON.stringify(this.adjustedAverage)
      );
      /*** MATRICES ***/
    } else {
      this.csvdata = JSON.parse(localStorage.getItem("csvdata")).sort();
      this.filename = JSON.parse(localStorage.getItem("filename"));
      this.tableConfig = JSON.parse(localStorage.getItem("tableConfig"));
      this.groupByCSV = JSON.parse(localStorage.getItem("groupByCSV"));
      this.Wells = JSON.parse(localStorage.getItem("Wells"));
      this.rawAdjusted = JSON.parse(localStorage.getItem("rawAdjusted"));
      this.adjustedAverage = JSON.parse(
        localStorage.getItem("adjustedAverage")
      );
    }

    /*** MATRICES ***/
    this.WellsUniqueRows = this.Wells.map(el => {
      return el.replace(/[^a-zA-Z]/, "");
    });
    this.WellsUniqueRows = [...new Set(this.WellsUniqueRows)];
    this.WellsUniqueCols = this.Wells.map(el => {
      return el.replace(/[a-zA-Z]/, "");
    });
    this.WellsUniqueCols.unshift("Titulo");
    this.WellsUniqueCols = [...new Set(this.WellsUniqueCols)];
    this.adjustedAverageBy4 = _.chunk(this.adjustedAverage, [4]);
    /*** MATRICES ***/
    this.minimum = this.adjustedAverageBy4.map(e => {
      return e[0];
    });
    this.minimum = _.min(this.minimum);
    this.curve = this.adjustedAverage.map(e => {
      if (e - this.minimum < 0) {
        return 0;
      } else {
        return e - this.minimum;
      }
    });
    this.curveBy4 = _.chunk(this.curve, [4]);
  },
  beforeMount() {
    if (this.adjustedAverageBy4 != undefined) {
      localStorage.setItem(
        "adjustedAverageBy4",
        JSON.stringify(this.adjustedAverageBy4)
      );
    } else {
      this.adjustedAverageBy4 = JSON.parse(
        localStorage.getItem("adjustedAverageBy4")
      );
    }
    if (this.curveBy4 != undefined) {
      localStorage.setItem("curveBy4", JSON.stringify(this.curveBy4));
    } else {
      this.curveBy4 = JSON.parse(localStorage.getItem("curveBy4"));
    }
  },
  mounted() {
    this.$root.$on("datosUpdate", data => {
      this.showactive = data[0];
    });

    this.$root.$on("netaUpdate", data => {
      this.showactive = data[0];
    });

    this.$root.$on("matrizNativaUpdate", data => {
      this.showactive = data[0];
    });
    this.$root.$on("matrizNativaUpdate", data => {
      this.showactive = data[0];
    });
  }
};
</script>

<style scoped lang="scss"></style>
