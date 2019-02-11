const Layer = require('./layer.js')

module.exports = class Network {
	constructor(sizes=[2,1]) {
		// 'sizes' is an array of integers giving the number of nodes per layer

		let numLayers = sizes.length - 1
		this.layers = new Array(numLayers)

		for (let I = 0; I < sizes.length-1; I++) {
			let numInputs = sizes[I]
			let numOutputs = sizes[I+1]

			this.layers[I] = new Layer(numInputs, numOutputs)
		}

		this.fresh = false	// poor-man's memoization
	}

	activate() {
		let thisLayer

		for (let I in this.layers) {
			thisLayer = this.layers[I]
			
			if (I > 0) {
				// the inputs for the first layer are loaded explicitly
				// hidden and output layers are inputized of the activation of each prior layer
				let prevLayer = this.layers[I-1]

				thisLayer.input(prevLayer.output)
			}

			thisLayer.activate()
		}

		this.activation = thisLayer.output	// save the output
		this.fresh = true
	}

	get error() {
		let result = 0

		this.layers.forEach(layer => {layer.error > result ? result = layer.error : result})

		return result / this.layers.length
	}

	input(valueArray) {
		this.layers[0].input(valueArray)

		this.fresh = false
	}

	get output() {
		if (!this.fresh) this.activate()

		return this.activation
	}

	train(expecto) {
		let expectation = expecto
		// expectation is an array of expected values for the network
		for (let I = this.layers.length-1; I >= 0; I--) {
			let thisLayer = this.layers[I]

			// we back-track and use the newly minted expectation for the next/prior layer
			thisLayer.train(expectation)

			expectation = thisLayer.expectation
		}
	}

	trainTo(expecto, threshold) {
		while (this.error > threshold) this.train(expecto)
	}
}
