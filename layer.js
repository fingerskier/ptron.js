const Perceptron = require('./ptron.js')

module.exports = class Layer {
	constructor(dimension, inputs) {
		this.nodes = []
		this.output = []

		for (let I = 0; I < dimension; I++) {
			this.nodes.push(new Perceptron(inputs))
		}
	}

	activate(inputs) {
		for (let node of this.nodes) {
			this.output.push(node.activate(inputs))
		}
	}

	train(expectation) {
		for (let I in this.nodes) {
			this.nodes[I].train(expectation[I])
		}
	}
}
