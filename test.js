// p[0].(in0,in1,in2) => p[1]

module.exports = function(X) {
	console.log(X)

	function activation(Y) {
		console.log(Y)
	}

	return activation
}