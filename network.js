const Layer = require('./layer.js')

module.exports = class Network {
	constructor(sizes) {
		// 'sizes' is an array of integers giving the number of nodes per layer

		this.layers = []

		for (let I in sizes) {
			let numInputs = sizes[I-1] ? I > 0 : sizes[I]
			let size = sizes[I]

			this.layers[I] = new Layer(size, numInputs)
		}
	}

	run() {
		for (let layer of this.layers) {
			layer.activate()
		}
	}

	train(expectation) {
		// expectation is an array of expected values from the trainer
		// subsequently we back-track and use the new outputs for that layer as the new expectation
		for (let I = this.layers.length-1; I > 0; I--) {
			this.layers[I].train(expectation)

			expectation = this.layers.output
		}
	}
}