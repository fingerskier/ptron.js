function assert(truthy, msg) {
	if (truthy) console.log("Pass: ", msg)
	else console.error("Fail: ", msg)

	console.log()
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

// console.dir(graf)

assert(
	JSON.stringify(expectedTopology) == JSON.stringify(graf.layers),
	`topology is ${graf.layers} and should be ${expectedTopology}`
)

/*
0	3	6
1	4	7
2	5	8
*/
graf = new Ptron.graph([
	[3,4,5],
	[3,4,5],
	[3,4,5],
	[6,7,8],
	[6,7,8],
	[6,7,8],
	[],
	[],
	[]
])

console.log(graf.topology)
console.log(graf.model)

let flat = [0.1,0.2,0.3]

graf.activate(flat)
console.log(graf.model)


// console.log("graf pre-train", graf.activation)

graf.train([0.3,0.2,0.1])
console.log(graf.model)

// console.log("graf post-train", graf.activation)
