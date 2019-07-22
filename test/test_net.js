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

let acceptableError = 0.1
console.log("initial net", net.model)
console.log()

let data = [{
	input:[1,0], output:[1]
},{
	input:[0,1], output:[1]
},{
	input:[0,0], output:[0]
},{
	input:[1,1], output:[0]
}]

while (Math.abs(net.error) > acceptableError) {
	for (let I=0; I < data.length; I++) {
		let inputs = data[I].input
		let outputs = data[I].output
		console.log(`Training #${I}, before`, net.model)
		net.train(inputs, outputs)
		console.log(`Training #${I}, after`, net.model)
	
		assert(
			`${inputs[0]} XOR ${inputs[1]} = ${net.signal}`,
			Math.abs(net.error) < acceptableError
		)
	}
}
