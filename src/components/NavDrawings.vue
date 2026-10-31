<template>
	<form>
		<div class="form-row justify-content-center">
			<div class="col-1">
				<select class="form-control" v-model="selected" @change="changeDisplayGraphic">
					<option>1</option>
					<option>2</option>
				</select>
			</div>
			<div class="col-1">
				<input type="text" disabled class="form-control" placeholder="LINEAR" />
			</div>
			<div class="col-4" v-show="selected == 1">
				<h5 class="align-middle mt-2">y= {{ mbsLinear[0] }} x + {{ mbsLinear[1] }}</h5>
			</div>
			<div class="col-4" v-show="selected == 2">
				<h5 class="align-middle mt-2">y= {{ mbsCuadratic[0] }} x2 + {{ mbsCuadratic[1] }} x + {{ mbsCuadratic[2] }}</h5>
			</div>
			<div class="col-2" v-show="selected == 1">
				<h5 class="align-middle mt-2">R2 ={{ mbsLinear[2] }}</h5>
			</div>
			<div class="col-2" v-show="selected == 2">
				<h5 class="align-middle mt-2">R2 ={{ mbsCuadratic[3] }}</h5>
			</div>
		</div>
	</form>
</template>

<script>
export default {
	props: {},
	data() {
		return {
			mbsLinear: [],
			mbsCuadratic: [],
			selected: '1',
		};
	},
	methods: {
		changeDisplayGraphic: function() {
			console.log('navdrawings');
			console.log(this.selected);
			this.$root.$emit('changeDisplayGraphic', this.selected);
		},
	},
	beforeMount() {
		this.$root.$on('emitCoefficientsLinear', (data) => {
			this.mbsLinear = data;
		});
		this.$root.$on('emitCoefficientsCuadratic', (data) => {
			this.mbsCuadratic = data;
		});
	},
};
</script>

<style scoped lang="scss"></style>
