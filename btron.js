function sigmoid(X) {
	return 1 / (1 + Math.exp(X))
}

function RELU(X) {
	return Math.max(0, X)
}

function stall(X) {
	if (X > 0.5) return true
	else return false
}


module.exports = class Perceptron {
	constructor(dimension = 1, bias = 1, rate = 0.1) {
		this.bias = bias
		this.error = 1.0
		this.expect = new Array(dimension)
		this.rate = rate
		this.weight = new Array(dimension)

		// initially random weight
		for (let I = 0; I < dimension; ++I) {
			this.weight[I] = Math.random()
		}
	}

	activate(inputs) {
		let result = this.bias

		this.inputs = inputs	// remember the inputs for training

		for (let I = 0; I < inputs.length; ++I) {
			result += this.weight[I] * inputs[I]
		}

		result = RELU(result)
		this.activation = result
		return result
	}

	get expectation() {
		return this.expect
	}

	learn(expected_output, threshold) {
		this.error = expected_output - this.activate(this.inputs)

		while (Math.abs(this.error) > threshold) this.train(expected_output)
	}

	get model() {
		return this.weight
	}

	set model(valArray) {
		this.weight = valArray
	}

	train(expected_output) {
		// training is based on the previous output
		// so, the ptron must be activated prior to training a new set of inputs
		this.error = expected_output - this.activate(this.inputs)

		for (let I in this.weight) {
			this.expect[I] = Math.sqrt(Math.abs(this.error / this.weight[I]))
			this.weight[I] = this.weight[I] + (this.error * this.inputs[I] * this.rate)
		}
	}
}
