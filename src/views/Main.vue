<template>
  <div class="container">
    <Navbar />
    <Upload
      :csvdata="csvdata"
      :filename="filename"
      @CSV="updateCSV($event)"
      @SD="linkData($event)"
    />
    <h1>{{ filename }}</h1>
    <Table :csvdata="csvdata" :filename="filename" :tableConfig="tableConfig" />
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Upload from "../components/Upload";
import Table from "../components/Table";

export default {
  data() {
    return {
      csvdata: [],
      filename: "Choose file",
      tableConfig: []
    };
  },
  components: {
    Navbar,
    Upload,
    Table
  },
  methods: {
    updateCSV: function(el) {
      this.filename = el[0];
      this.csvdata = el[1].slice(1, el[1].length - 1);
      this.tableConfig = el[1].shift();
      this.csvdata = this.csvdata.map(el => {
        return el.map(e => {
          return e.replace(/,/g, ".");
        });
      });
    },
    linkData: function() {
      if (localStorage.getItem("filename") != "") {
        localStorage.setItem("filename", JSON.stringify(this.filename));
      }
      if (localStorage.getItem("csvdata") != "") {
        localStorage.setItem("csvdata", JSON.stringify(this.csvdata));
      }
      if (localStorage.getItem("tableConfig") != "") {
        localStorage.setItem("tableConfig", JSON.stringify(this.tableConfig));
      }
      this.$router.push({
        name: "Procesados",
        params: { data: [this.filename, this.tableConfig, this.csvdata] }
      });
    }
  },
  mounted() {
    if (localStorage.getItem("filename") != "") {
      this.filename = JSON.parse(localStorage.getItem("filename"));
    }
    if (localStorage.getItem("csvdata") != "") {
      this.csvdata = JSON.parse(localStorage.getItem("csvdata")).sort();
    }
    if (localStorage.getItem("tableConfig") != "") {
      this.tableConfig = JSON.parse(localStorage.getItem("tableConfig"));
    }
  }
};
</script>

<style scoped lang="scss"></style>
