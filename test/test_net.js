function assert(msg, truth) {
	if (truth) console.log("Pass: ", msg)
	else console.error("Fail: ", msg)
}


let Ptron = require('../ptron.js')

let net = new Ptron.network([2,2,1])

assert(
	"network instantiation as network type",
	net instanceof Ptron.network
)

let one = [1]
let zero = [0]
let acceptableError = 0.1
console.log("initial net", net.model)
console.log()

let inputVals = [0,0]
let outputVals = [0]
while (Math.abs(net.error) > acceptableError) net.train(inputVals, outputVals)
console.log("first training", net.model)
assert(
	`${inputVals[0]} XOR ${inputVals[1]} = ${net.signal}`,
	Math.abs(net.error) < acceptableError
)
console.log(net.error)

// inputVals = [0,1]
// outputVals = [1]
// while (Math.abs(net.error) > acceptableError) net.train(inputVals, outputVals)
// assert(
// 	`${inputVals[0]} XOR ${inputVals[1]} = ${net.signal}`,
// 	Math.abs(net.error) < acceptableError
// )
// console.log(net.error)

// inputVals = [1,0]
// outputVals = [1]
// while (Math.abs(net.error) > acceptableError) net.train(inputVals, outputVals)
// assert(
// 	`${inputVals[0]} XOR ${inputVals[1]} = ${net.signal}`,
// 	Math.abs(net.error) < acceptableError
// )
// console.log(net.error)

// inputVals = [1,1]
// outputVals = [0]
// while (Math.abs(net.error) > acceptableError) net.train(inputVals, outputVals)
// assert(
// 	`${inputVals[0]} XOR ${inputVals[1]} = ${net.signal}`,
// 	Math.abs(net.error) < acceptableError
// )
// console.log(net.error)

// console.log(net.model)


// see that the training holds for all states
// net.train([0,0], zero)
// assert(
// 	`training holds for 0 XOR 0; ${net.signal}`,
// 	net.signal = zero
// )

// net.train([0,1], [1])
// let err01 = net.error

// net.train([1,0], [1])
// let err10 = net.error

// net.train([1,1], [0])
// let err11 = net.error


// assert(
// 	"training holds for 0 XOR 1",
// 	err01 <= acceptableError
// )
// assert(
// 	"training holds for 1 XOR 0",
// 	err10 <= acceptableError
// )
// assert(
// 	"training holds for 1 XOR 1",
// 	err11 <= acceptableError
// )


// console.log(net.model)
