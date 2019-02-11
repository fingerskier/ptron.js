const fs = require('fs')

const repl = require('repl')
const server = repl.start({
	prompt: "ptron> ",
	input: process.stdin,
	output: process.stdout
})

// load history if any
fs.statSync('.node_repl_history')


server.context.P = require('./ptron.js')

server.context.net = new server.context.P.network([2,2,1])
server.context.in0 = [.1,.2]
server.context.in1 = [.2,.8]

server.context.ptron = new server.context.P.ptron(2)
server.context.ptron.activate(server.context.in0)


/*
0	0	0
0	1	1
1	0	1
1	1	0
*/


server.on('exit', function() {
	fs.appendFileSync('.node_repl_history', server.lines.join('\n'))
})

server.on('reset', function() {
	server.context.P = require('./ptron.js')

	server.context.net = new server.context.P.network(2,2,1)
})
