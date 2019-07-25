class Network {
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

		return arrayMax(errors)	// arrayMax is always non-negative
	}

	activate(inputs) {
		let layer
		let I = 0

		// feed-forward
		for (layer of this.layers) {
			layer.activate(inputs)

			inputs = layer.signal
		}

		this.signal = layer.signal	// final/outputs layer

		return this.signal
	}

	learn(data, threshold) {
		// data typeof [{input:[], output:[]}]
		this.train(data.input, data.output)

		while (this.error > threshold) {
			this.train(data.input, data.output)
		}

		return this.error
	}

	train(inputs, outputs) {
		let I = 0

		this.activate(inputs)
		
		// back-propogate
		for (let I = this.layers.length-1; I >= 0; I--) {
			let thisInput = (I > 0) ? this.layers[I-1].signal : inputs
			let thisLayer = this.layers[I]
			
			// console.log(`net.train_layer${I}: ${thisInput} | `, outputs)
			thisLayer.train(thisInput, outputs)
			
			outputs = thisLayer.expect
			// console.log(`net.train_layer${I}_end: `, outputs)
		}

		this.activate(inputs)

		return this.signal
	}
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Network
