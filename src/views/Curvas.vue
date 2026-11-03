<template>
	<div class="container">
		<Navbar />
		<NoData v-if="!hasData" />
		<template v-else>
			<NavDrawings />
			<Drawing v-show="selected == 1" />
			<DrawingCuadratic v-show="selected == 2" />
		</template>
	</div>
</template>

<script>
	import Navbar from '../components/Navbar';
	import Drawing from '../components/Drawing';
	import DrawingCuadratic from '../components/DrawingCuadratic';
	import NavDrawings from '../components/NavDrawings';
	import NoData from '../components/NoData';
	export default {
		data() {
			// the curve is saved by the Process Data page; without it there is nothing to fit
			const curveBy4 = JSON.parse(localStorage.getItem('curveBy4'));
			return {
				mbs: [],
				selected: '1',
				hasData: Array.isArray(curveBy4) && curveBy4.length > 0,
			};
		},
		components: {
			Navbar,
			NavDrawings,
			Drawing,
			DrawingCuadratic,
			NoData,
		},
		methods: {},
		beforeMount() {
			this.$root.$on('changeDisplayGraphic', (data) => {
				this.selected = data;
			});
		},
		mounted() {
			if (localStorage.getItem('filename') != null) {
				this.filename = JSON.parse(localStorage.getItem('filename'));
			}
			if (localStorage.getItem('csvdata') != null) {
				this.csvdata = JSON.parse(localStorage.getItem('csvdata')).sort();
			}
			if (localStorage.getItem('tableConfig') != null) {
				this.tableConfig = JSON.parse(localStorage.getItem('tableConfig'));
			}
		},
	};
</script>

<style scoped lang="scss"></style>
