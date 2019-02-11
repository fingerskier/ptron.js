function assert(truthy, msg) {
	if (truthy) console.log("Pass: ", msg)
	else console.error("Fail: ", msg)
}


let Ptron = require('../ptron.js')

let net = new Ptron.network([2,2,2])

assert(net instanceof Ptron.network, "network construction as network type")

let inputVals = [.5,.3]
net.activate(inputVals)

assert(net.layers[0].nodes[0].inputs[0] == net.layers[0].nodes[1].inputs[0], "network ptron inputs should be set by input()")


net = new Ptron.network([2,2,1])

let one = [1]
let zero = [0]
let acceptableError = 0.1

net.activate([0,0])
net.learn(zero, acceptableError)
assert(net.error < acceptableError, "net trained to 0 XOR 0")
console.log(net.activation)

net.activate([0,1])
net.learn(one, acceptableError)
assert(net.error < acceptableError, "net trained to 0 XOR 1")
console.log(net.activation)

net.activate([1,0])
net.learn(one, acceptableError)
assert(net.error < acceptableError, "net trained to 1 XOR 0")
console.log(net.activation)

net.activate([1,1])
net.learn(zero, acceptableError)
assert(net.error < acceptableError, "net trained to 1 XOR 1")
console.log(net.activation)

// see that the training holds for all states
net.activate([0,0])
net.learn(zero, acceptableError)
let err00 = net.error

net.activate([0,1])
net.learn(one, acceptableError)
let err01 = net.error

net.activate([1,0])
net.learn(one, acceptableError)
let err10 = net.error

net.activate([1,1])
net.learn(zero, acceptableError)
let err11 = net.error


assert(err00 <= acceptableError, "training holds for 0 XOR 0")
assert(err01 <= acceptableError, "training holds for 0 XOR 1")
assert(err10 <= acceptableError, "training holds for 1 XOR 0")
assert(err11 <= acceptableError, "training holds for 1 XOR 1")


for (layer of net.layers) for (node of layer.nodes) console.log(node)
