// Testing network model export/import

function assert(truthy, msg) {
	if (truthy) console.log("Pass: ", msg)
	else console.error("Fail: ", msg)
}


const fs = require('fs')
const Ptron = require('../ptron.js')

let net = new Ptron.network([5,5,5])

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
	"network ptron inputs should be set by input()")

let acceptableError = 0.1
let X = 0

for (let I of input) {
	net.activate(I)
	net.learn(I, acceptableError)
	assert(net.error < acceptableError, `net trained to ${X++}`)
	console.log(I, net.activation)
}

let preActivation = net.activate(input[0])

// write out the model
modelfilename = './test_model.json'
fs.writeFileSync(modelfilename, JSON.stringify(net.model))

net = new Ptron.network([5,5,5])

assert(net.model instanceof Array, "net.model should be an array")

// read back in the model
net.model = JSON.parse(fs.readFileSync(modelfilename))

// see that the activation holds
let postActivation = net.activate(input[0])
let same = true

for (let I in preActivation) {
	if (preActivation[I] !== postActivation[I]) some = false
}

assert(same, "activation should be the same after loading the model")

console.log(preActivation)
console.log(postActivation)
