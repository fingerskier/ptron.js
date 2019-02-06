/*
	This neural entity is structured as a 3D array:
	e.g.
	[
		I0, H0, O0,
		I1, H1, O1,
	],[
		--, W0, W0,
		--, W0, W0,
	],[
		--, W1, W1,
		--, W1, W1
	]

	The weights are stacked up "behind" the neural values.
	The data-structure of this entity is:
	{
		name: "id",
		numInputs: 2,
		numLayers: 3,	// ...including ins & outs
		weight: []
	}
*/

const endOfLine = require('os').EOL


function createArray(length) {
	var arr = new Array(length || 0),
		i = length;

	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while(i--) arr[length-1 - i] = createArray.apply(this, args);
	}

	return arr;
}

function sigmoid(X) {
	return 1 / (1 + Math.exp(X))
}


module.exports = class Perceptron {
	constructor(numInputs, numLayers) {
		this.depth = numInputs + 1
		this.height = numInputs
		this.width = numLayers

		this.length = numInputs * (numInputs+1) * numLayers
		this.weight = new Array(this.length)

		this.weight.fill(0,0,(this.height * this.width))
		this.weight.fill(Math.random(),(this.height * this.width),this.weight.length)
		for (let I = this.height*this.width; I < this.length; I++)
			this.weight[I] = I

		this.bias = 1
		this.learningRate = 0.1
	}

	activate() {
		let X, Y, Z = 0

		for (X = 1; X < this.width; X++) {
			for (Y = 0; Y < this.height; Y++) {
				let activation = 0
				
				for (Z = 1; Z < this.height; Z++) {
					let weight = this.getElement(X,Y,Z)
					let input = this.getElement(X-1,Y,0)
					
					activation += weight * input
				}

				activation += this.bias
				
				this.setElement(X, Y, Z, sigmoid(activation))
			}
		}
	}

	getElement(X,Y,Z) {
		return this.weight[this.index(X,Y,Z)]
	}

	index (X, Y, Z) {
		// elements are stretched out into a list
		// 3D coords must be deferenced to find the element
		return X + (this.height * Y) + (this.height * this.width * Z)
	}

	set input(Input) {
		for (let Y in Input) {
			this.setElement(0, Y, 0, Input[Y])
		}
	}

	get output() {
		let result = new Array(this.height)
		for (let Y = 0; Y < this.height; Y++) {
			result[Y] = this.getElement(this.width-1, Y, 0)
		}

		return result
	}

	get prettyPrint() {
		let result = ""

		for (let Z=0; Z < this.depth; Z++) {
			result += `[`

			for (let Y=0; Y < this.height; Y++) {
				for (let X=0; X < this.width; X++) {
					result += `${this.getElement(X,Y,Z)}, `
				}

				result += endOfLine
			}
			
			result += "]" + endOfLine
		}

		return result
	}

	setElement(X,Y,Z,value) {
		this.weight[this.index(X,Y,Z)] = value
	}

	train(expectation) {
		// expectation is an array corresponding to the output array
		let I, X, Y, Z = 0
		// let error = [][]

		for (X=this.width-1; X > 0; X--) {

		}

		// the error for a level is the difference between the expected value and the output scaled [down] by the learning-rate
		let error = expectation.map(x => (x - this.getElement(this.width-1, I++, 0) * this.learningRate))

		// calculate the new weights for the previous layer
		

		// apply the new weights for the previous layer


		// use the new activations
	}
}
