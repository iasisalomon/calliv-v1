<template>
  <div class="input-group">
    <div class="custom-file">
      <input
        type="file"
        class="custom-file-input"
        id="inputGroupFile04"
        aria-describedby="inputGroupFileAddon04"
        @input="parseFile"
      />
      <label class="custom-file-label" for="inputGroupFile04">
        {{ csvFilenameUpdate }}
      </label>
    </div>
    <div class="input-group-append">
      <button
        class="btn btn-outline-secondary"
        type="button"
        id="inputGroupFileAddon04"
        @click="csvCSV"
      >
        Subir
      </button>
    </div>
    <div class="input-group-append">
      <button
        class="btn btn-outline-info"
        type="button"
        id="inputGroupFileAddon04"
        @click="shareData"
      >
        Procesar
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    csvdata: {
      type: Array
    },
    filename: {
      type: String
    }
  },
  data() {
    return {
      csvUpdate: [],
      csvFilenameUpdate: "Choose File"
    };
  },
  methods: {
    csvCSV: function() {
      this.$emit("CSV", [this.csvFilenameUpdate, this.csvUpdate]);
    },
    shareData: function() {
      this.$emit("SD", true);
    },
    parseFile: function() {
      let element = document.getElementById("inputGroupFile04");
      this.csvFilenameUpdate = element.files[0].name;
      this.$papa.parse(element.files[0], {
        complete: parsed => (this.csvUpdate = parsed.data)
      });
    }
  }
};
</script>
