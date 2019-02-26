const Ptron = require('../ptron.js')

let net = new Ptron.network([5,5,7,2,7,5])


let inputs = [0.5, 0.3, 0.4, 0.25, 0.35]
let errorVal = 0.1

net.activate(inputs)

console.time("learn")

net.learn(inputs, errorVal)

console.info(errorVal)
console.timeEnd("learn")

console.log(net.layers[2].activation)

// for (let layer of net.layers) console.log(layer)
// console.info(net)
