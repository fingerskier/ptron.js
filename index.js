// node.js support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports.ptron = require('./perceptron.js')

	module.exports.layer = require('./layer.js')

	module.exports.network = require('./network.js')
}
// ---


let N = new Network([2,2,1])
let L = new Layer(2,1)
let P = new Perceptron({dimension:2})

assert(
	"network instantiation as network type",
	N instanceof Network
)

let acceptableError = 0.1

let data = [{
	input:[1,0.0001], output:[0.9999]
},{
	input:[0.0001,1], output:[0.9999]
},{
	input:[0.0001,0.0001], output:[0.0001]
},{
	input:[1,1], output:[0.0001]
}]

// for (let I=0; I < data.length; I++) {
// 	console.log(`${I}: before`, data.input, N.signal, N.error)

// 	while (Math.abs(N.error) > acceptableError)
// 		N.learn(data[I])

// 	console.log(`${I}: after`, data.input, N.signal, N.error)

// 	console.log()
// }


// for (let I=0; I < data.length; I++) {
// 	let inputs = data[I].input
// 	let outputs = data[I].output

// 	assert(
// 		`${inputs[0]} XOR ${inputs[1]} = ${N.signal}`,
// 		Math.abs(N.error) < acceptableError
// 	)

// 	console.log()
// }




function flarn(thing, threshold) {
	thing.learn(data[0])
	thing.learn(data[1])
	thing.learn(data[2])
	thing.learn(data[3])
}

// train(L, data[0], 0.3)
// train(L, data[1], 0.3)
// train(L, data[2], 0.3)
// train(L, data[3], 0.3)
