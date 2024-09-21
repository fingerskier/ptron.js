import Ptron from '../index.js'


const mlp = new Ptron([5, 7, 5, 7, 1])

const data = [
  {in: [0,1,2,3,4], out: [1]},
  {in: [1,1,1,1,1], out: [0.5]},
  {in: [5,4,3,2,1], out: [0]},
  {in: [0,0,0,0,0], out: [0.5]},
  {in: [1,2,3,4,5], out: [1]},
  {in: [6,6,6,6,6], out: [0.5]},
  {in: [9,7,5,4,3], out: [0]},
  {in: [1,2,5,6,8], out: [1]},
  
  {in: [2,3,4,5,6], out: [1]},
  {in: [3,3,3,3,3], out: [0.5]},
  {in: [6,5,4,3,2], out: [0]},
  {in: [2,2,2,2,2], out: [0.5]},
  {in: [7,7,7,7,7], out: [0.5]},
  {in: [10,8,6,5,4], out: [0]},
  {in: [2,3,6,7,9], out: [1]},
  {in: [9,9,9,9,9], out: [0.5]},
]

const inputs = data.map(d => d.in)

const targets = data.map(d => d.out)


console.time('Training time')

mlp.loadModel('test/incdec.json')

mlp.train(inputs, targets, 0.1, 100000)


const test = [
  [6,7,8,9,10],
  [-1,-1,-1,-1,-1],
  [11,9,7,5,3],
  [.1,.1,.1,.1,.1],
  [8,8.01,8.02,7.99,7.98],
  [1,3,5,6,7],
  [2,4,5,7,10],
  [8,8,8,8,8],
]

const output = [
  mlp.predict(test[0]),
  mlp.predict(test[1]),
  mlp.predict(test[2]),
  mlp.predict(test[3]),
  mlp.predict(test[4]),
  mlp.predict(test[5]),
  mlp.predict(test[6]),
  mlp.predict(test[7]),
]

for (let i = 0; i < test.length; i++) {
  let result = 'stable'
  if (output[i] > 0.8) result = 'increasing'
  if (output[i] < 0.2) result = 'decreasing'
  console.log(test[i], result)
}

mlp.saveModel('test/incdec.json')

console.timeEnd('Training time')