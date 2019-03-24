function sigmoid(X) {
	return 1 / (1 + Math.exp(X))
}

function RELU(X) {
	return Math.max(0, X)
}


class Perceptron {
	constructor(dimension = 1, bias = 1, rate = 0.1) {
		this.bias = bias
		this.error = 1.0
		this.expect = new Array(dimension)
		this.rate = rate
		this.weight = new Array(dimension)

		// initially random weight
		for (let I = 0; I < dimension; ++I) {
			this.weight[I] = Math.random()
		}
	}

	activate(inputs) {
		let result = this.bias

		this.inputs = inputs	// remember the inputs for training

		for (let I = 0; I < inputs.length; ++I) {
			result += this.weight[I] * inputs[I]
		}

		result = RELU(result)
		this.activation = result
		return result
	}

	get expectation() {
		return this.expect
	}

	learn(expected_output, threshold) {
		this.error = expected_output - this.activate(this.inputs)

		while (Math.abs(this.error) > threshold) this.train(expected_output)
	}

	get model() {
		return this.weight
	}

	set model(valArray) {
		this.weight = valArray
	}

	train(expected_output) {
		// training is based on the previous output
		// so, the ptron must be activated prior to training a new set of inputs
		this.error = expected_output - this.activate(this.inputs)

		for (let I in this.weight) {
			this.expect[I] = Math.sqrt(Math.abs(this.error / this.weight[I]))
			this.weight[I] = this.weight[I] + (this.error * this.inputs[I] * this.rate)
		}
	}
}


class Graph {
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
		this.nodes = []	// the actual perceptron controllers
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
		for (let I = 0; I < conx.length; I++) this.nodes.push(new Perceptron(dimension[I]))
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

////

G = new Graph([
	[3,4,5],
	[3,4,5],
	[3,4,5],
	[6,7,8],
	[6,7,8],
	[6,7,8],
	[],
	[],
	[]
])

inputs = [0.1,0.2,0.3]

G.activate(inputs)
