module.exports = class Perceptron {
	constructor(dimension, bias = 1, rate = 0.1) {
		this.inputs = []
		this.weights = []

		// initially random weights
		for (let I = 0; I < dimension; ++I) {
			this.inputs[I] = 0.0
			this.weights[I] = Math.random()
		}

		this.bias = bias
		this.rate = rate
	}

	activate(ins) {
		this.inputs = ins

		this.output = this.bias

		for (let I = 0; I < this.dimension; ++I) {
			this.output += this.weights[I] * this.inputs[I]
		}

		return this.output
	}

	train(expectation) {
		let error = expectation - this.output

		for (let I in this.weights) {
			this.weights[I] = error * this.rate * this.weights[I]
		}
	}
}
