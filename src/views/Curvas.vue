<template>
	<div class="container">
		<Navbar />
		<NavDrawings />
		<Drawing v-show="selected == 1" />
		<DrawingCuadratic v-show="selected == 2" />
	</div>
</template>

<script>
	import Navbar from '../components/Navbar';
	import Drawing from '../components/Drawing';
	import DrawingCuadratic from '../components/DrawingCuadratic';
	import NavDrawings from '../components/NavDrawings';
	export default {
		data() {
			return {
				mbs: [],
				selected: '1',
			};
		},
		components: {
			Navbar,
			NavDrawings,
			Drawing,
			DrawingCuadratic,
		},
		methods: {},
		beforeMount() {
			this.$root.$on('changeDisplayGraphic', (data) => {
				this.selected = data;
			});
		},
		mounted() {
			if (localStorage.getItem('filename') != '') {
				this.filename = JSON.parse(localStorage.getItem('filename'));
			}
			if (localStorage.getItem('csvdata') != '') {
				this.csvdata = JSON.parse(localStorage.getItem('csvdata')).sort();
			}
			if (localStorage.getItem('tableConfig') != '') {
				this.tableConfig = JSON.parse(localStorage.getItem('tableConfig'));
			}
		},
	};
</script>

<style scoped lang="scss"></style>
