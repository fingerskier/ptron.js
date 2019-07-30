// a layer is a set of perceptrons that share the same inputs


class Layer {
	constructor(numInputs = 1, numOutputs = 1) {
		this.expect = new Array(numInputs)
		this.nodes = []
		this.signal = new Array(numOutputs)

		this.expect.fill(0)

		for (let I = 0; I < numOutputs; I++) {
			this.nodes.push(new Perceptron({dimension:numInputs}))
		}
	}

	get error() {
		let errors = []

		this.nodes.forEach(node => errors.push(node.error))

		return arrayMax(errors)
	}

	set input(val_arr) {
		this.signal = []

		for (let I in this.nodes) {
			this.nodes[I].input = val_arr
			this.signal.push(this.nodes[I].signal)
		}
	}

	learn(data) {
		this.input = data.input

		for (let I in this.nodes) {
			this.nodes[I].learn({input:data.input, output:data.output[I]})
		}
		
		this.input = data.input

		this.expect.fill(0)
		let firstNode = this.nodes[0]

		for (let I in firstNode.expect) {
			for (let N of this.nodes) {
				this.expect[I] += N.expect[I]
			}

			this.expect[I] /= firstNode.expect.length
		}

		return this.signal
	}
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Layer
