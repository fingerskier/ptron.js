function sigmoid(X) {
	return 1 / (1 + Math.exp(X))
}


module.exports.ptron = require('./perceptron.js')

module.exports.layer = require('./layer.js')

module.exports.network = require('./network.js')

module.exports.graph = require('./graph.js')
