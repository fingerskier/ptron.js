const arrayMax = arr => {
	let result = 0

	for (let X of arr) 
		if (Math.abs(X) > result) result = X

	return result
}


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
	}

	activate(inputs) {
		let layer

		this.inputs = inputs

		for (layer of this.layers) {
			layer.activate(inputs)

			inputs = layer.activation
		}

		this.activation = layer.activation
		return this.activation
	}

	get error() {
		let errors = []

		this.layers.forEach(layer => errors.push(layer.error))

		return arrayMax(errors)
	}

	get model() {
		let result = []

		for (let layer of this.layers) {
			result.push(layer.model)
		}

		return result
	}

	set model(valArrays) {
		let I = 0

		for (let layer of this.layers) {
			layer.model = valArrays[I++]
		}
	}

	learn(expecto, threshold) {
		this.train(expecto)

		while (Math.abs(this.error) > threshold) this.train(expecto)
	}

	train(expecto) {
		let expectation = expecto
		// expectation is an array of expected values for the network

		for (let I = this.layers.length-1; I >= 0; I--) {
			let thisLayer = this.layers[I]

			thisLayer.train(expectation)

			expectation = thisLayer.expectation
		}

		this.activate(this.inputs)
	}
}
