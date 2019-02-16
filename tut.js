const Ptron = require('./ptron.js')
let p = new Ptron.ptron(2)	// 2 inputs

// random values produce a garbage result
let inputs = [0.1, 0.2]
console.log(p.activate(inputs))

// so we train the perceptron to achieve the value we want
let desiredValue = 0.5
let threshold = 0.1
p.learn(desiredValue, threshold)

// ...and it yields closer to the answer we want
console.log(p.activate(inputs))

// we could train it more and get a better result
threshold = 0.01
p.learn(desiredValue, threshold)
console.log(p.activate(inputs))


// but a single ptron can only classify a single feature
// this is where layers come in: they encapsulate multiple ptrons sharing the same inputs

// here is layer of 2 ptrons, each with 2 inputs
let layer = new Ptron.layer(2,2)
console.log(layer.activate(inputs))
// this layer gives 2 outputs because it has 2 ptrons

// and again we can train it to classify better
desiredValue = [0.1, 0.9]
layer.learn(desiredValue, threshold)
console.log(layer.activate(inputs))
// close enough for government work...

// training ad infinitum on simple classifiers is not very fruitful in this context
// these types of general handlers really shine in large feature-sets and predictive modeling
	
// however, a perceptron (or a single layer of them) is only capable of handling linearly differentiable data; i.e. stuff that can categorized on a graph by a dividing _line_
// this is where networks come in: they are simply a series of ptron-layers that are activated left to right - feeding into each other (and trained right-to-left back-feeding the desired output)

let net = new Ptron.network([2,2,1])
// this describes a network which has 2 inputs, 2 throughputs, and 1 output
// i.e. a network that of two layers: 2 ptrons in the first feeding one in the output
// note that there is always one layer less than the length of the descriptor array
// adding layers like this allows us a higher-order of classification (i.e. non-linear)

console.log(net.activate(inputs))
// obviously the output is random to start with because the ptron are randomized to start with
desiredValue = [0.3]
threshold = 0.1
net.learn(desiredValue, threshold)
console.log(net.activate(inputs))

