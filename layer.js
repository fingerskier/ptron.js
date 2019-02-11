// a layer is a set of perceptrons that share the same inputs

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

	activate() {
		let result = []

		for (let node of this.nodes) {
			result.push(node.output)
		}

		this.activation = result
		this.fresh = true
	}

	get error() {
		let result = 0

		this.nodes.forEach(node => {node.error > result ? result = node.error : result})

		return result / this.nodes.length
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

	input(valArray) {
		// this.nodes.forEach(node=>node.input(valArray))

		for (let node of this.nodes) {
			node.input(valArray)
		}
		this.fresh = false
	}

	get output() {
		if (!this.fresh) activate()

		return this.activation
	}

	train(expectation) {
		this.expect.fill(0)

		for (let I in this.nodes) {
			this.nodes[I].train(expectation[I])
		}
	}
}
