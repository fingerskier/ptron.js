import MLP from '../index.js'


const mlp = new MLP([3, 5, 2])
const inputs = [
  [0.1, 0.2, 0.3],
  [0.4, 0.5, 0.6],
  [0.7, 0.8, 0.9],
]
const targets = [
  [0, 1],
  [1, 0],
  [0, 1],
]

console.time('Training time')

mlp.loadModel('test/model.json')

mlp.train(inputs, targets, 0.1, 1000000)

const output = [
  mlp.predict(inputs[0]),
  mlp.predict(inputs[1]),
  mlp.predict(inputs[2]),
]

console.log('Expected:', targets)
console.log('Output:', output)

mlp.saveModel('test/model.json')

console.timeEnd('Training time')