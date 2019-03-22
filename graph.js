const Perceptron = require('./perceptron.js')


module.exports = class {
	constructor(conx) {
		// conx is an array of arrays which defines the connections between perceptrons
		/* e.g.
			[
			 0->[3,4] ~> this means that node 0 signals nodes 3 & 4
			 1->[3,4]
			 2->[3,4]
			 3->[5,6,7]
			 4->[5,6,7]
			 5->[]
			 6->[]
			 7->[]
			]
		*/
		// Note that the _graph_ does not enforce any kind of structure;
		// errant topology is up to the implementor to disentangle
		this.activation = []	// activation of each layer, by layer-index
		this.layer = new Array(conx.length)	// the layer number of each element, by node-index
		this.nodes = new Array(conx.length)	// the actual perceptron controllers
		this.topology = []		// array of nodes per layer

		// elements in the array give the layer number of each node
		this.layer = this.layer.fill(0)
		
		// set the layer number of each node
		for (let I in conx) {
			for (let X of conx[I]) {
				this.layer[X] = this.layer[I] + 1
			}
		}
		
		// add node-indices to the topology array
		for (let I in this.layer) {
			let index = this.layer[I]
			this.topology[index] = this.topology[index] || []
			this.topology[index].push(+I)
		}

		// glean the dimension of each layer
		let dimension = new Array(conx.length)
		for (let layer of this.topology)
			for (let nodeIndex of layer)
				dimension[nodeIndex] = layer.length

		// instantiate all the node controllers
		for (let I in this.nodes) this.nodes.push(new Perceptron(dimension[I]))
	}

	activate(inputs) {
		// cycle through "layers" and activate each node, top to bottom
		let layerActivation = []

		for (let layer of this.topology) {
			layerActivation = []

			for (let nodeIndex of layer) {
				let thisNode = this.nodes[nodeIndex]

				// activate this node
				thisNode.activate(inputs)

				// store this node's activation in an array for the next layer
				layerActivation.push(thisNode.activation)
			}

			inputs = layerActivation
		}

		this.activation = layerActivation
	}

	get prettyTopology() {
		let maxLength = 0

		for (let X of this.topology)
			if (maxLength < X.length) maxLength = X.length 

		let result = ""

		for (let I = 0; I < maxLength; I++) {
			for (let layer of this.topology) {
				if (layer[I]) result += ' ' + layer[I]
				else result += '  '
			}
			result += '\n\r'
		}

		return result
	}

	train() {
		// cycle backwards through "layers" and train each node, top to bottom
	}
}