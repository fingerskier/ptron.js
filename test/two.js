import MLP from '../index.js'


const mlp = new MLP([3, 5, 1, 5, 2])

const inputs = [
  [0.1, 0.2, 0.3],
  [0.3, 0.2, 0.1],
  [0.4, 0.45, 0.46],
  [0.7, 0.8, 0.9],
  [0.9, 0.8, 0.7],
  [0.23, 0.2, 0.26],
]

const targets = [
  [0, 1],
  [1, 0],
  [1, 1],
  [0, 1],
  [1, 0],
  [1, 1],
]


console.time('Training time')

mlp.loadModel('test/two.json')

mlp.train(inputs, targets, 0.1, 10000)

const output = [
  mlp.predict(inputs[0]),
  mlp.predict(inputs[1]),
  mlp.predict(inputs[2]),
  mlp.predict(inputs[3]),
  mlp.predict(inputs[4]),
  mlp.predict(inputs[5]),
]

for (let i = 0; i < inputs.length; i++) {
  console.log('Expected:', targets[i])
  console.log('  Actual:', output[i])
}

mlp.saveModel('test/two.json')

console.timeEnd('Training time')