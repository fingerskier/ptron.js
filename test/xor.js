import MLP from '../index.js'


const mlp = new MLP([2, 2, 1])

const data = [
  {in: [1, 0], out: [1]},
  {in: [1, 1], out: [0]},
  {in: [0, 1], out: [1]},
  {in: [0, 0], out: [0]},
  {in: [1, 0], out: [1]},
  {in: [1, 1], out: [0]},
  {in: [0, 1], out: [1]},
  {in: [0, 0], out: [0]},
]

const inputs = data.map(d => d.in)

const targets = data.map(d => d.out)


console.time('Training time')

mlp.loadModel('test/xor.json')

mlp.train(inputs, targets, 0.1, 100000)

const output = [
  mlp.predict(inputs[0]),
  mlp.predict(inputs[1]),
  mlp.predict(inputs[2]),
  mlp.predict(inputs[3]),
  mlp.predict(inputs[4]),
  mlp.predict(inputs[5]),
  mlp.predict(inputs[6]),
  mlp.predict(inputs[7]),
]

for (let i = 0; i < inputs.length; i++) {
  console.log('Expected:', targets[i])
  console.log('  Actual:', output[i])
}

mlp.saveModel('test/xor.json')

console.timeEnd('Training time')