import fs from 'fs'


class Ptron {
  constructor(layers) {
    this.layers = layers
    this.weights = []
    this.biases = []

    // Initialize weights and biases for each layer
    for (let i = 1; i < layers.length; i++) {
      const inputSize = layers[i - 1]
      const outputSize = layers[i]

      // Random weights and biases initialization
      this.weights.push(this.randomMatrix(outputSize, inputSize))
      this.biases.push(this.randomArray(outputSize))
    }
  }

  randomMatrix(rows, cols) {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.random() * 2 - 1)
    )
  }

  randomArray(size) {
    return Array.from({ length: size }, () => Math.random() * 2 - 1)
  }

  sigmoid(x) {
    return 1 / (1 + Math.exp(-x))
  }

  sigmoidDerivative(x) {
    return x * (1 - x)
  }
  

  predict(input) {
    this.activations = [input]
    this.zValues = []

    let activations = input

    for (let i = 0; i < this.weights.length; i++) {
      const weight = this.weights[i]
      const bias = this.biases[i]
      
      const z = this.addVectors(this.dotProduct(weight, activations), bias)
      this.zValues.push(z)
      
      activations = this.activate(z)
      this.activations.push(activations)
    }
    
    return activations
  }
  
  
  activate(array) {
    return array.map(this.sigmoid)
  }
  
  
  dotProduct(matrix, vector) {
    return matrix.map(row =>
      row.reduce((sum, value, i) => sum + value * vector[i], 0)
    )
  }
  
  
  addVectors(a, b) {
    return a.map((val, i) => val + b[i])
  }
  
  
  subtractVectors(a, b) {
    return a.map((val, i) => val - b[i])
  }
  
  
  train(inputs, targets, learningRate = 0.1, epochs = 1000, chatty=false) {
    for (let epoch = 0; epoch < epochs; epoch++) {
      let epochLoss = 0 // Track loss over the entire epoch

      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i]
        const target = targets[i]

        // Forward pass
        const output = this.predict(input)

        // Compute error
        let error = this.subtractVectors(target, output)
        epochLoss += error.reduce((sum, e) => sum + e * e, 0) / error.length

        // Backpropagation
        let deltas = error.map((e, i) => e * this.sigmoidDerivative(output[i]))

        for (let layer = this.weights.length - 1; layer >= 0; layer--) {
          const activation = this.activations[layer]
          const z = this.zValues[layer]

          // Update weights and biases
          this.weights[layer] = this.weights[layer].map((row, j) =>
            row.map(
              (value, k) => value + learningRate * deltas[j] * activation[k]
            )
          )

          this.biases[layer] = this.biases[layer].map(
            (b, j) => b + learningRate * deltas[j]
          )

          // Compute the deltas for the previous layer
          const previousDeltas = deltas
          if (layer > 0) {
            const previousWeights = this.weights[layer]
            deltas = activation.map((_, j) =>
              previousWeights.reduce(
                (sum, weightRow, k) =>
                  sum + weightRow[j] * previousDeltas[k],
                0
              ) * this.sigmoidDerivative(activation[j])
            )
          }
        }
      }
      
      if (epoch % 100 === 0) {
        const averageLoss = epochLoss / inputs.length
        if (chatty) console.log(`Epoch ${epoch}, Loss: ${averageLoss.toFixed(4)}`)
      }
    }
  }
  
  
  saveModel(filename) {
    try {
      const data = {
        weights: this.weights,
        biases: this.biases,
      }
      
      fs.writeFileSync(filename, JSON.stringify(data))
    } catch (error) {
      console.error(error)
    }
  }
  
  
  loadModel(filename) {
    try {
      const data = JSON.parse(fs.readFileSync(filename, 'utf-8'))
      
      this.weights = data.weights
      this.biases = data.biases
    } catch (error) {
      console.error(error)
    }
  }
}


export default Ptron