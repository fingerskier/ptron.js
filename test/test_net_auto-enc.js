function assert(truthy, msg) {
	if (truthy) console.log("Pass: ", msg)
	else console.error("Fail: ", msg)
}


let Ptron = require('../ptron.js')

let net = new Ptron.network([5,5,2,5])

assert(net instanceof Ptron.network, "network construction as network type")

let input = []
input[0] = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
input[1] = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
input[2] = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
input[3] = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
input[4] = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
input[5] = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
net.activate(input[0])

assert(
	net.layers[0].nodes[0].inputs[0] == net.layers[0].nodes[2].inputs[0], 
	"network ptron inputs should be set by input()"
)

let acceptableError = 0.01
let X = 0

for (let I of input) {
	net.activate(I)
	net.learn(I, acceptableError)
	assert(net.error < acceptableError, `net trained to ${X++}`)
	console.log(net.layers[1].activation)
}


// see that the training holds for all states
X = 0
for (let I of input) {
	net.activate(I)
	net.learn(I, acceptableError)
	assert(net.error <= acceptableError, `training holds for ${X++}`)
	console.log(net.layers[1].activation)
}


// for (layer of net.layers) for (node of layer.nodes) console.log(node)
