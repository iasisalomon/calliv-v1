import * as tf from '@tensorflow/tfjs';

export default {
	linear: (x_vals, y_vals) => {
		const m = tf.variable(tf.scalar(Math.random()));
		const b = tf.variable(tf.scalar(Math.random()));

		const learningRate = 0.5;
		const optimizer = tf.train.sgd(learningRate);

		function predict(x) {
			// y = m * x + b
			return m.mul(x).add(b);
		}

		function loss(predictions, labels) {
			// Mean Squared Error
			return predictions
				.sub(labels)
				.square()
				.mean();
		}

		function train(xs, ys) {
			//train function
			optimizer.minimize(() => loss(predict(xs), ys));
		}

		for (let i = 0; i < 1000; i++) {
			//execute train n times
			train(x_vals, y_vals);
		}

		let finalm = Number(m.dataSync());
		let finalb = Number(b.dataSync());
		let predictedys = x_vals.map((el) => {
			return finalm * el + finalb;
		});

		//r2 calculations
		let sum = y_vals.reduce((previous, current) => (current += previous));

		let mean = sum / y_vals.length;

		//SEmean
		let y2mean = y_vals.map((el) => {
			return Math.pow(el - mean, 2);
		});
		let SEmean = y2mean.reduce((previous, current) => (current += previous));

		//SEline
		let y2diff = [];
		for (let i = 0; i < y_vals.length; i++) {
			y2diff.push(Math.pow(y_vals[i] - predictedys[i], 2));
		}
		let SEline = y2diff.reduce((previous, current) => (current += previous));

		//R2 determination
		let r2 = 1 - SEline / SEmean;
		r2 = [Number(r2.toFixed(5))];

		return [finalm, finalb, r2];
	},
};
