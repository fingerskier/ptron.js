function sigmoid(X) {
	return 1 / (1 + Math.exp(X))
}


module.exports = class Perceptron {
	constructor(dimension = 1, bias = 0.1, rate = 0.1) {
		this.activation = 0.0
		this.bias = bias
		this.error = 1.0
		this.expect = new Array(dimension)
		this.inputs = new Array(dimension)
		this.rate = rate
		this.weight = new Array(dimension)

		// initially random weight
		this.inputs.fill(0)
		for (let I = 0; I < dimension; ++I) {
			this.weight[I] = Math.random()
		}
	}

	activate(valArray) {
		let result = this.bias

		for (let I in this.inputs) {
			// this.inputs[I] = sigmoid(valArray[I])
			this.inputs[I] = valArray[I]
		}

		for (let I = 0; I < this.inputs.length; ++I) {
			result += this.weight[I] * this.inputs[I]
		}

		// this.activation = sigmoid(result)
		this.activation = result

		return result
	}

	get expectation() {
		return this.expect
	}

	get output() {
		return this.activation
	}

	train(expected_output) {
		this.error = expected_output - this.output

		for (let I in this.weight) {
			this.expect[I] = Math.sqrt(Math.abs(this.error / this.weight[I]))
			this.weight[I] = this.weight[I] - (this.error * this.inputs[I] * this.rate)
		}
	}
}
