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
		this.fresh = false
		this.nodes = []

		for (let I = 0; I < numOutputs; I++) {
			this.nodes.push(new Perceptron(numInputs))
		}
	}

	activate(inputs) {
		this.activation = []
		this.inputs = inputs	// remember inputs for training

		for (let I in this.nodes) {
			this.activation.push(this.nodes[I].activate(inputs))
		}

		return this.activation
	}

	get error() {
		let errors = []

		this.nodes.forEach(node => errors.push(node.error))

		return arrayMax(errors)
	}

	get expectation() {
		this.expect = this.nodes[0].expect

		if (this.nodes.length > 1) {
			this.nodes.forEach(node=>{
				let I = 0

				node.expect.forEach(expected=>{
					node.expectation[I++]+=expected
				})
			})
		}

		return this.expect
	}

	learn(expected_output, threshold) {
		this.train(expected_output)

		while (Math.abs(this.error) > threshold) this.train(expected_output)
	}

	get model() {
		let result = []

		for (let node of this.nodes) {
			result.push(node.weight)
		}

		return result
	}

	set model(valArrays) {
		let I = 0

		for (let node of this.nodes) {
			node.model = valArrays[I++]
		}
	}

	train(expectation) {
		this.expect.fill(0)

		for (let I in this.nodes) {
			this.nodes[I].train(expectation[I])
		}

		this.activate(this.inputs)
	}
}
