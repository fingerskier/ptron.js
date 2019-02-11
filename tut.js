Ptron = require('./ptron.js')
p = new Ptron.ptron(2)	// 2 inputs

p.input([1,2])
p.output

while (p.error > 0.01) p.train(.5)
p.output

p1 = new Ptron.ptron(2)
p2 = new Ptron.ptron(2)
p_out = new Ptron.ptron(2)

input = [1,2]
p1.input(input)
p2.input(input)
p_out.input([p1.output, p2.output])

while (p.error > 0.01) p_out.train(.8)
p.output


layer = new Ptron.layer(2,2)
layer.input(input)
p_out.input(layer.output)

while (p_out.error > 0.1) {
	p_out.train(.8)
	layer.train(p_out.expect)
}



// networks
layer1 = new Ptron.layer(2,2)
layer2 = new Ptron.layer(1)

netIn = [1,2]
layer1.input(netIn)
layer2.input(layer1.output)

