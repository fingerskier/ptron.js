function assert(truthy, msg) {
	if (truthy) console.log("Pass: ", msg)
	else console.error("Fail: ", msg)
}


let Ptron = require('../ptron.js')

let ptron = new Ptron.ptron({
	dimension: 2
})

assert( ptron instanceof Ptron.ptron, "ptron construction of correct type" )

inputVals = [0.1, 0.2]
outputVal = 0.5

ptron.train(inputVals, outputVal)

assert(ptron.signal, "ptron has an activation value after being activated")

assert(ptron.activation != NaN, "ptron output should be numeric")

let errorBefore = Math.abs(ptron.error)
for (let I = 0; I < 1000; I++) ptron.train(inputVals, outputVal)
let errorAfter = Math.abs(ptron.error)
assert(errorAfter < errorBefore, `training should decrease error; before:${errorBefore}, after:${errorAfter}`)

console.info(ptron)
