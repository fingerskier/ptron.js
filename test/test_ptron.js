function assert(truthy, msg) {
	if (truthy) console.log("Pass: ", msg)
	else console.error("Fail: ", msg)
}


let Ptron = require('../ptron.js')

let ptron = new Ptron.ptron(2)

assert( ptron instanceof Ptron.ptron, "ptron construction of correct type" )

inputVals = [.1,.2]

ptron.activate(inputVals)

assert(ptron.activation, "ptron has an activation value after being activated")

assert(ptron.activation != NaN, "ptron output should be numeric")

ptron.learn(0.9, 0.1)
assert(Math.abs(ptron.error) <= 0.1, "ptron error should decrease below threshold after learning")

ptron.learn(0.1, 0.1)
assert(Math.abs(ptron.error) <= 0.1, "ptron should be able to re-learn")

console.info(ptron)
