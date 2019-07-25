let Ptron = require('../ptron.js')

let net = new Ptron.network([2,2,1])

assert(
	"network instantiation as network type",
	net instanceof Ptron.network
)

let acceptableError = 0.1

let data = [{
	input:[1,0], output:[1]
},{
	input:[0,1], output:[1]
},{
	input:[0,0], output:[0]
},{
	input:[1,1], output:[0]
}]

for (let I=0; I < data.length; I++) {
	let inputs = data[I].input
	let outputs = data[I].output

	console.log(`${I}: before`, inputs, net.signal, net.error)
	while (Math.abs(net.error) > acceptableError)
		net.train(inputs, outputs)
	console.log(`${I}: after`, inputs, net.signal, net.error)

	console.log()
}


for (let I=0; I < data.length; I++) {
	let inputs = data[I].input
	let outputs = data[I].output

	assert(
		`${inputs[0]} XOR ${inputs[1]} = ${net.signal}`,
		Math.abs(net.error) < acceptableError
	)

	console.log()
}

