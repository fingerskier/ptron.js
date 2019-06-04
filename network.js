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

	train(inputter, outputter) {
		let inputs = inputter.slice()
		let outputs = outputter.slice()
		let layer
		let I = 0

		// feed-forward
		for (layer of this.layers) {
console.log(`train layer${I++} w/ ${inputs}->${outputs}`)
			layer.train(inputs, outputs)

			inputs = layer.signal
		}

		this.signal = layer.signal

		// back-propogate
		for (let I = this.layers.length-1; I >= 0; I--) {
			let thisLayer = this.layers[I]

			if (I > 0) inputs = this.layers[I-1].signal
			else inputs = inputter

			thisLayer.train(inputs, outputs)

			outputs = thisLayer.expects
		}
	}
}
