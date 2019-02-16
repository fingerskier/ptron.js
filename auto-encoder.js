const Ptron = require('./ptron.js')

let net = new Ptron.network([5,7,2,7,5])


let inputs = [0.5, 0.3, 0.4, 0.25, 0.35]

net.activate(inputs)

// net.learn(inputs, 0.1)

// for (let node of net.layers[0].nodes) console.log(node)
