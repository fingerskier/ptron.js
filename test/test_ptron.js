function assert(truthy, passMsg, failMsg) {
	if (truthy) console.log("Pass: ", passMsg)
	else console.error("Fail: ", errorMsg)
}


let Ptron = require('../ptron.js')

let ptron = new Ptron.ptron(2)

assert(
	ptron instanceof Ptron.ptron,
	"ptron construction succesful",
	"ptron construction failed"
)

inputVals = [1,2]

ptron.input(inputVals)
assert(!ptron.fresh, "ptron un-fresh expected after input", "ptron shouldn't be fresh after input")

ptron.output
assert(ptron.output != NaN, "ptron output should be numeric", "ptron output isn't numeric")

while (ptron.error > 0.1) ptron.train(ptron.output - 0.1)
assert(ptron.error <= 0.1, "ptron error should decrease after training", "ptron error didn't decrease after training")

console.info(ptron)
