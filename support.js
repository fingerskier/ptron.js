const arrayMax = arr => {
    // this returns the maximum absolute value
    // ...always non-negative
	let result = 0
	let X = 0

	for (let I in arr) arr[I] = Math.abs(arr[I])
	
	for (X of arr) (X > result) ? result = X : result

	return result
}


function assert(msg, truth) {
	if (truth) console.log("Pass: ", msg)
	else console.error("Fail: ", msg)
}


function sigmoid(X) {
	return 1 / (1 + Math.exp(X))
}


function RELU(X) {
	return Math.max(0, X)
}
