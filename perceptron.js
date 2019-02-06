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
	}

	index (X, Y, Z) {
		// elements are stretched out into a list
		// 3D coords must be deferenced to find the element
		return X + (this.height * Y) + (this.height * this.width * Z)
	}

	_getElement(X,Y,Z) {
		return this.weight[this.index(X,Y,Z)]
	}

	_setElement(X,Y,Z,value) {
		this.weight[this.index(X,Y,Z)] = value
	}

	input(X, Y, Z) {
		for (let X in input) {
			this._setElement(X,0,0,input[X])
		}
	}

	activate() {
		for (let X = 1; X < this.width; X++) {
			for (let Y = 0; Y < this.height; Y++) {
				let activation = 0
				
				for (let Z = 1; Z < this.height; Z++) {
					let weight = this._getElement(X,Y,Z)
					let input = this._getElement(X-1,0,Z)
					
					activation += weight * input
				}
				
				this._setElement(activation)
			}
		}
	}

	output() {
		let result = new Array(this.height)
		for (let Y = 0; Y < this.height; Y++) {
			result[Y] = this._getElement(this.width-1, Y, 0)
		}

		return result
	}

	get prettyPrint() {
		let result = ""

		for (let Z=0; Z < this.depth; Z++) {
			result += `[`

			for (let Y=0; Y < this.height; Y++) {
				for (let X=0; X < this.width; X++) {
					result += `(${X},${Y},${Z}),`
				}

				result += endOfLine
			}
			
			result += "]" + endOfLine
		}

		return result
	}
}
