<template>
	<div class="container mt-1">
		<div class="container mt-1"></div>
		<div id="canvasCuadratic" class="row justify-content-center"></div>
	</div>
</template>

<script>
import P5 from 'p5';
import grade2 from '../javascripts/grade2.js';
import * as tf from '@tensorflow/tfjs';

export default {
	props: {},
	data() {
		return {
			curveBy4: [],
			ys: [],
			xs: [0, 4.2, 9.7, 14.6, 22, 33.3, 50, 100],
			predictedYs: [],
			mbs: [],
		};
	},
	methods: {
		emitCoefficientsCuadratic: function () {
			this.$root.$emit('emitCoefficientsCuadratic', this.mbs);
		},
	},
	created() {
		//manejo del Local Storage
		localStorage.setItem('xs', JSON.stringify(this.xs));
		this.curveBy4 = JSON.parse(localStorage.getItem('curveBy4'));

		this.ys = this.curveBy4.map((el) => {
			return el[1];
		});
		localStorage.setItem('ys', JSON.stringify(this.ys));

		let xs = JSON.parse(localStorage.getItem('xs'));
		xs = xs.map((el) => {
			Number(el);
			return el / 100;
		});
		let ys = JSON.parse(localStorage.getItem('ys'));

		ys = ys.map((el) => {
			Number(el);
			return el / 100000;
		});

		localStorage.setItem('xs', JSON.stringify(this.xs));
		localStorage.setItem('ys', JSON.stringify(this.ys));

		//llamada a la optimizacion
		let flan = grade2.cuadratic(xs, ys);
		//removing array that will draw the curve
		this.predictedYs = flan.pop();
		console.log(this.predictedYs[0]);
		//store remaining numbers
		this.mbs = flan.map((el) => {
			return el[0];
		});
		this.mbs = this.mbs.map((el) => {
			return Number(el.toFixed(5));
		});

		console.log(tf.memory().numTensors);
	},
	beforeMount() {
		const sketch = (s) => {
			let w = 1080;
			let h = 600;
			function grid() {
				s.strokeWeight(0.1);
				for (var x = 0; x < w; x += 20) {
					s.line(x, 0, x, h);
					for (var y = 0; y < h; y += 20) {
						s.line(0, y, w, y);
					}
				}
				s.translate(0, h);
				s.scale(1, -1);
			}
			s.setup = () => {
				s.createCanvas(w, h);
			};

			s.draw = () => {
				s.frameRate(30);
				s.background(220);
				grid();
				//data management
				let xsd = JSON.parse(localStorage.getItem('xs'));
				let ysd = JSON.parse(localStorage.getItem('ys'));

				xsd = xsd.map((el) => {
					Number(el);
					return el / 100;
				});
				ysd = ysd.map((el) => {
					Number(el);
					return el / 100000;
				});

				//dot drawing
				s.push();
				s.stroke('red');
				s.strokeWeight(5);
				for (let i = 0; i < xsd.length; i++) {
					let px = s.map(xsd[i], 0, 1, 0, w);
					let py = s.map(ysd[i], 0, 1, 0, h);
					s.point(px, py);
				}
				s.pop();
				//line drawing
				s.push();
				s.stroke('blue');
				s.strokeWeight(2);
				s.noFill();
				s.beginShape();
				for (let i = 0; i < xsd.length; i++) {
					let x = s.map(xsd[i], 0, 1, 0, w);
					let y = s.map(this.predictedYs[0][i], 0, 1, 0, h);
					s.vertex(x, y);
				}
				s.endShape();
				s.pop();
			};
		};
		new P5(sketch, 'canvasCuadratic');
	},
	mounted() {
		console.log(this.mbs);
		this.emitCoefficientsCuadratic();
	},
};
</script>
