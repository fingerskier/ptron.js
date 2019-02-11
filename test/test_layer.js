function assert(truthy, msg) {
	if (truthy) console.log("Pass: ", msg)
	else console.error("Fail: ", msg)
}


let Ptron = require('../ptron.js')
let layer = new Ptron.layer(2,2)

assert(layer instanceof Ptron.layer, "layer construction as Ptron type")

let inputVals = [1,2]
layer.input(inputVals)

assert(layer.nodes[0].inputs[0] == layer.nodes[1].inputs[0], "layer ptron inputs should be set by input()")

assert(!layer.fresh, "layer un-fresh expected after input")

layer.activate()

assert(layer.fresh, "expect layer freshness after activation")

let expectation = [layer.output[0]-0.1, layer.output[1]+0.1]
while (layer.error > 0.1) layer.train(expectation)

assert(layer.error, "error should be less than 0.1 after training")

console.log(layer)
