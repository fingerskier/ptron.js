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

server.context.net = new server.context.P.network([2,1])

server.context.one = [1]
server.context.zero = [0]

server.context.net.input([0,0])
server.context.net.trainTo([0], 0.1)

server.context.net.input([0,1])
server.context.net.trainTo([1], 0.1)

server.context.net.input([1,0])
server.context.net.trainTo([1], 0.1)

server.context.net.input([1,1])
server.context.net.trainTo([0], 0.1)

/*
0	0	0
0	1	1
1	0	1
1	1	0
*/


console.dir(server.context.net)


server.on('exit', function() {
	fs.appendFileSync('.node_repl_history', server.lines.join('\n'))
})

server.on('reset', function() {
	server.context.P = require('./ptron.js')

	server.context.net = new server.context.P.network(2,2,1)
})
