function assert(truthy, msg) {
	if (truthy) console.log("Pass: ", msg)
	else console.error("Fail: ", msg)
}


let Ptron = require('../ptron.js')

let net = new Ptron.network([2,2,2])

assert(net instanceof Ptron.network, "network construction as network type")

let inputVals = [1,2]
net.input(inputVals)

assert(net.layers[0].nodes[0].inputs[0] == net.layers[0].nodes[1].inputs[0], "network ptron inputs should be set by input()")

assert(!net.fresh, "network un-fresh expected after input")

net.activate()

assert(net.fresh, "expect network freshness after activation")

let expectation = [net.output[0]-0.1, net.output[1]+0.1]

net = new Ptron.network([2,2,1])

let one = [1]
let zero = [0]

net.input([0,0])
net.trainTo(zero, 0.1)
console.log(net.output)

net.input([0,1])
net.trainTo(one, 0.1)
console.log(net.output)

net.input([1,0])
net.trainTo(one, 0.1)
console.log(net.output)

net.input([1,1])
net.trainTo(zero, 0.1)
console.log(net.output)

for (layer of net.layers) for (node of layer.nodes) console.log(node)
