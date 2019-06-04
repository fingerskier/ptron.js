function assert(msg, truthy) {
	if (truthy) console.log("Pass: ", msg)
	else console.error("Fail: ", msg)
}


let Ptron = require('../ptron.js')
let layer = new Ptron.layer(2,2)

assert(layer instanceof Ptron.layer, "layer construction as Ptron type")

let inputVals = [0.3, 0.4]
let outputsVals = [0.5, 0.6]


layer.train(inputVals, outputsVals)
let errorBefore = layer.error

while (Math.abs(layer.error) > 0.1) layer.train(inputVals, outputsVals)
let errorAfter = layer.error
assert(
	`error: before=${errorBefore.toFixed(2)}, after=${errorAfter.toFixed(2)}, diff=${layer.error.toFixed(2)}`,
	Math.abs(errorAfter) <= 0.1
)

errorBefore = layer.error
while (Math.abs(layer.error) > 0.01) layer.train(inputVals, outputsVals)
errorAfter = layer.error
assert(
	`error: before=${errorBefore.toFixed(2)}, after=${errorAfter.toFixed(2)}, diff=${layer.error.toFixed(2)}`,
	Math.abs(errorAfter) <= 0.01
)

console.log(layer)
console.log(layer.signal)
console.log(layer.error)
