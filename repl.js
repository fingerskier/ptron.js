const fs = require('fs')

const repl = require('repl')
const server = repl.start({
	prompt: "ptron> ",
	input: process.stdin,
	output: process.stdout
})

// load history if any
// fs.statSync('.node_repl_history')


server.context.P = require('./ptron.js')

server.context.flat = [0.1,0.2,0.3]
server.context.graf = new server.context.P.graph([
	[3,4,5],
	[3,4,5],
	[3,4,5],
	[6,7,8],
	[6,7,8],
	[6,7,8],
	[],
	[],
	[]
])

server.context.graf.activate(server.context.flat)


server.on('exit', function() {
	fs.appendFileSync('.node_repl_history', server.lines.join('\n'))
})

server.on('reset', function() {
	server.context.P = require('./ptron.js')

	server.context.net = new server.context.P.network(2,2,1)
})
