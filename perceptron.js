function sigmoid(X) {
	return 1 / (1 + Math.exp(X))
}

function RELU(X) {
	return Math.max(0, X)
}


module.exports = class Perceptron {
	constructor(opts) {
		this.bias = opts.bias || 1
		this.dimension = opts.dimension || 4
		this.rate = opts.rate || 0.1
		
		this.signal = 0
		this.error = 1
		
		this.expect = new Array(this.dimension)
		this.model = new Array(this.dimension)

		this.expect.fill(0)
		this.model.fill(0.5)
	}

	activate(inputter) {
		let inputs = inputter.slice()
		
		this.signal = this.bias
		
		for (let I = 0; I < inputs.length; ++I) {
			this.signal += this.model[I] * inputs[I]
		}
		
		this.signal = RELU(this.signal)
	}

	train(inputs, output) {
		this.activate(inputs)
		
		this.error = output - this.signal
		// console.log(`ptron.train_initial ${output}, ${this.signal}`)

		this.expect.fill(0)

		for (let I in this.model) {
			// console.log(`ptron.train_loop`,this.error, this.model[I])
			this.expect[I] = Math.sqrt(Math.abs(this.error / this.model[I]))
			this.model[I] = this.model[I] + (this.error * inputs[I] * this.rate)
			// console.log(`ptron expects ${this.expect}`)
		}
	}
}
