const fs = require('fs')

const repl = require('repl')
const server = repl.start({
	prompt: "ptron> ",
	input: process.stdin,
	output: process.stdout
})

// load history if any
fs.statSync('.node_repl_history')

// // replay history
// fs.readFileSync('.node_repl_history')
// 	.split('\n')
// 	.reverse()
// 	.filter(line => line.trim())
// 	.map(line => server.history.push(line))

server.context.perceptron = require('./perceptron.js')
server.context.p = new server.context.perceptron(2,3)

server.on('exit', function() {
	fs.appendFileSync('.node_repl_history', server.lines.join('\n'))
})

server.on('reset', function() {
	server.context.perceptron = require('./perceptron.js')
	server.context.p = new server.context.perceptron(2,3)
})


