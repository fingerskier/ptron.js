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

	activate(inputter) {
		let inputs = inputter.slice()

		this.signal = []

		for (let I in this.nodes) {
			this.nodes[I].activate(inputs)
			this.signal.push(this.nodes[I].signal)
		}
	}

	train(inputs, outputs) {
		this.activate(inputs)

		// console.log(`layer.train_initial ${inputs} |`, outputs)
		// console.log(`layer.outputs `, outputs)

		for (let I in this.nodes) {
			// console.log(`layer.train_node#${I}`, inputs, outputs[I])
			this.nodes[I].train(inputs, outputs[I])
			this.signal.push(this.nodes[I].signal)
		}

		this.expect.fill(0)
		let firstNode = this.nodes[0]

		for (let I in firstNode.expect) {
			for (let N of this.nodes) {
				this.expect[I] += N.expect[I]
			}

			this.expect[I] /= firstNode.expect.length
		}

		// console.log(`layer.expect `, this.expect)
	}
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Layer
