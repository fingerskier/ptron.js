// a layer is a set of perceptrons that share the same inputs

const arrayMax = arr => {
	let result = 0

	for (let X of arr) 
		if (Math.abs(X) > result) result = X

	return result
}

const Perceptron = require('./perceptron.js')


module.exports = class Layer {
	constructor(numInputs = 1, numOutputs = 1) {
		this.expect = new Array(numOutputs)
		this.nodes = []
		this.signal = new Array(numOutputs)

		for (let I = 0; I < numOutputs; I++) {
			this.nodes.push(new Perceptron({dimension:numInputs}))
		}
	}

	get error() {
		let errors = []

		this.nodes.forEach(node => errors.push(node.error))

		return arrayMax(errors)
	}

	get expects() {
		for (let I in this.expect) {
			this.expect[I] = 0

			for (let J in this.nodes) {
				this.expect[I] += this.nodes[I].expect[J]
			}

			this.expect[I] = this.expect[I] / this.nodes[0].expect.length
		}

		return this.expect
	}

	get model() {
		let result = []

		for (let node of this.nodes)
			result.push(node.weight)

		return result
	}

	set model(valArrays) {
		let I = 0

		for (let node of this.nodes)
			node.model = valArrays[I++]
	}

	activate(inputter) {
		let inputs = inputter.slice()

		this.signal = []

		for (let I in this.nodes) {
			this.nodes[I].activate(inputs)
			this.signal.push(this.nodes[I].signal)
		}
	}

	train(inputter, outputter) {
		let inputs = inputter.slice()
		let outputs = outputter.slice()

		this.activate(inputter)

		for (let I in this.nodes) {
			this.nodes[I].train(inputs, outputs[I])
			this.signal.push(this.nodes[I].signal)
		}
	}
}
