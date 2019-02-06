const Perceptron = require('./ptron.js')


module.exports = class Network {
	constructor(id, conx) {
		// conx is a list of all network connections: an array of tuples

		this.node = {}
		this.conx = []

		let dim = {}

		// build a hash of all node names
		this.conx = conx
		for (let connection of this.conx) {
			let targetNode = connection[1]

			dim[targetNode] = dim[targetNode]++ || 0
		}

console.log(this.conx)
console.log(dim)

		for (let nodeName in dim) {
			let nodeDim = dim[nodeName]
			this.node[nodeName] = new Perceptron(nodeDim)
		}
	}

	activate() {
		for (let node of this.node) {

		}
	}
}


/*

N = new Network("asdf",[["a","c"],["b","c"],["a","d"],["b","d"],["c","e"],["d","e"]])

enforcements
- input nodes must be declared as _input_ have dimension 1
- hidden layers do have an order but nodes aren't required to feed into the next layer
- nodes declared as _output_ are in the highest ordinal layer and have their values directed to a special surface

- inputs are just raw values coming from the world
- outputs are nodes

Network = {
	id: "A Network"
	node: {
		N1: {
			inputs[],
			output(),
			train()
		}
	},
	conx: [[N1,N2]]
}

// here, the dimension of a node is the number of inputs to it; i.e. how many times is named second in a conx tuple

*/