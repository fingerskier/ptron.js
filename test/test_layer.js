function assert(truthy, msg) {
	if (truthy) console.log("Pass: ", msg)
	else console.error("Fail: ", msg)
}


let Ptron = require('../ptron.js')
let layer = new Ptron.layer(2,2)

assert(layer instanceof Ptron.layer, "layer construction as Ptron type")

let inputVals = [.3, .4]

layer.activate(inputVals)

assert(layer.nodes[0].inputs[0] == layer.nodes[1].inputs[0], "layer ptron inputs should be set by input()")


layer.learn([-0.1, 0.1], 0.1)
assert(Math.abs(layer.error) <= 0.1, "error should be less than 0.1 after training")

console.log(layer, layer.error)


layer.learn([0.5, 0.8], 0.1)
assert(Math.abs(layer.error) <= 0.1, "layer should be able to re-learn")

console.log(layer, layer.error)
