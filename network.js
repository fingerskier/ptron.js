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

	set input(val_arr) {
		let layer
		let I = 0

		// feed-forward
		for (layer of this.layers) {
			layer.input = val_arr

			val_arr = layer.signal
		}

		this.signal = layer.signal	// final/outputs layer

		return this.signal
	}

	learn(data) {
		let I = 0

		this.input = data.input

		// back-propogate
		for (let I = this.layers.length-1; I >= 0; I--) {
			let theInput = (I > 0) ? this.layers[I-1].signal : data.input
			let thisLayer = this.layers[I]

			thisLayer.learn({input:theInput, output:data.output})

			data.output = thisLayer.expect
		}

		this.input = data.input

		return this.signal
	}
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Network
