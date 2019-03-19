function assert(truthy, msg) {
	if (truthy) console.log("Pass: ", msg)
	else console.error("Fail: ", msg)
}


let Ptron = require('../ptron.js')

let graf

assert(graf = new Ptron.graph(
	[
		[1,3],		// input1
		[4,6,7],	// hidden1
		[1,3],		// input2
		[4,6,7],	// hidden2
		[],			// output1
		[1,3],		// input3
		[],			// output2
		[]			// output3
	]),
	"graf is created as type 'Ptron.graph'")

let expectedTopology = [[0,2,5], [1,3], [4,6,7]]

assert(expectedTopology = graf.topology, "topology should be correctly gleaned")
console.log(graf.topology)

console.log(graf.prettyTopology)

console.log(graf)