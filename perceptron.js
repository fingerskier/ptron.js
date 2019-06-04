function sigmoid(X) {
	return 1 / (1 + Math.exp(X))
}

function RELU(X) {
	return Math.max(0, X)
}


module.exports = class Perceptron {
	constructor(opts) {
		this.bias = opts.bias || 0.01
		this.dimension = opts.dimension || 4
		this.rate = opts.rate || 0.1
		
		this.signal = 0
		this.error = 1
		
		this.expect = new Array(this.dimension)
		this.weight = new Array(this.dimension)

		// initially random weights
		for (let I = 0; I < this.dimension; ++I) {
			this.weight[I] = 0.5	//Math.random()
		}
	}

	get model() { return this.weight }

	set model(valArray) { this.weight = valArray }

	activate(inputter) {
		let inputs = inputter.slice()
		
		this.signal = this.bias
		
		for (let I = 0; I < inputs.length; ++I) {
			this.signal += this.weight[I] * inputs[I]
		}
		
		this.signal = RELU(this.signal)
	}
	
	train(inputter, output) {
		let inputs = inputter.slice()

		this.activate(inputter)
		
		this.error = output - this.signal

		for (let I in this.weight) {
			this.expect[I] = Math.sqrt(Math.abs(this.error / this.weight[I]))
			this.weight[I] = this.weight[I] + (this.error * inputs[I] * this.rate)
		}
	}
}
