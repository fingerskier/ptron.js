const Ptron = require('./ptron.js')

let feed_net = new Ptron.network([3,6,2])

let mem_net = new Ptron.network([2,4,2])

let out_net = new Ptron.network([4,4,2])

let running = false

while (running) {
	feed_net.activate(feedbacks)

	mem_net.activate(out_net.output)

	out_net.activate(feed_net.output.concat(mem_net.output))
}
