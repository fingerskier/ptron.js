class Perceptron {
	constructor(opts) {
		this.bias = opts.bias || 1
		this.dimension = opts.dimension || 4
		this.rate = opts.rate || 0.01

		this.signal = 0
		this.error = 1

		this.expect = new Array(this.dimension)
		this.model = new Array(this.dimension)

		this.expect.fill(0)
		this.model.fill(0.5)
	}

	set input(val_arr) {
		this.signal = this.bias
		
		for (let I = 0; I < val_arr.length; ++I) {
			this.signal += this.model[I] * val_arr[I]
		}
		
		// this.signal = LRELU(this.signal)
	}

	learn(data) {
		this.input = data.input

		this.error = data.output - this.signal

		this.expect.fill(0)
		
		for (let I in this.model) {
			this.expect[I] = Math.sqrt(Math.abs(this.error / this.model[I]))
			
			let diff = this.rate * this.error * data.input[I]
			console.log(`diff=${diff}`)

			this.model[I] = this.model[I] + diff
		}

		return this.signal
	}
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Perceptron
