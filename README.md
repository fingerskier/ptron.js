# ptron.js
Javascript perceptron class and framework


## Meta

This is a small, javascript only perceptron.
A perceptron is basically a solver for a system of linear equations.
The co-efficients of the equations can be determined automatically if we know which inputs map to which outputs through back-propogation training.
Small perceptrons can be trained and run locally.


## What use is it?

The solutions given are fuzzy but with diligent design and training they can be accurate enough.
e.g. you could probably achieve 90% accuracy for a simple classification task

Models can be generated and dissemenated as JSON files.
Models can also be trained _in the wild_ as needed.

Multiple small models can be munged to perform more complex tasks
e.g. multiple MLPs for each type of data, the results of which feed into another perceptron for a higher-level classification


## How to use

```javascript
import Ptron from 'ptron.js'


const mlp = new Ptron([3, 5, 2])
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

mlp.loadModel('model.json')

mlp.train(inputs, targets, 0.1, 1000000)

const output = [
  mlp.predict(inputs[0]),
  mlp.predict(inputs[1]),
  mlp.predict(inputs[2]),
]

console.log('Expected:', targets)
console.log('Output:', output)

mlp.saveModel('model.json')

console.timeEnd('Training time')
```