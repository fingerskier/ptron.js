# ptron.js
Javascript perceptron class and framework


## Meta

The goal of this project is to create a small, useable classifier which is composable into larger networks.

Basically, a perceptron (though the term may be unduly abrogated) is a solver for a linear equation; a network of perceptrons can [theoretically] "solve" systems of linear equations.
These solutions are fuzzy, in the sense that they don't give absolute answers but stochastic ones...but this can be quite helpful - especially if the margins are very low.
Engangled groups of perceptrons can be trained to for classification and prediction of myriad models.


## Usage

This perceptron is an entity that takes several inputs and generates one output.

```
	Ptron = require('./ptron.js')
	p = new Ptron.ptron(2)	// 2 inputs
```

Set the inputs by feeding it an array, then glean the output.

```
	p.input([1,2])
	p.output
```

The perceptron is trained by telling it what output you expect from that input:

```
	while (p.error > 0.01) p.train(.5)
	p.output
```

This is the [very] general process to follow implementing a simple classifier.


## Advancing

A single percetron is only capable of dealing with linearly differentiable data.
Basically, that means if you graph all your data and can't draw a straight line that separates it all into two types then you need something more.

Adding more capability could mean adding two things:
1. adding more ptron's to each recognize different "features"
2. adding subsequent "hidden" layers of ptron's for higher-order features

Here we have 2 perceptrons handling input and feeding into another ptron which generates our output.

```
	p1 = new Ptron.ptron(2)
	p2 = new Ptron.ptron(2)
	p_out = new Ptron.ptron(2)

	input = [1,2]
	p1.input(input)
	p2.input(input)
	p_out.input([p1.output, p2.output])
```

This will classify data that isn't so simple.
We can train our output ptron like before:

```
	while (p.error > 0.01) p_out.train(.8)
	p.output
```

But how do we train our input ptron's?
It is necessary to use the known error for the output Ptron, which we gave it, and use that train each input Ptron.
This is where layers come in: they add this training feature and a learning rate which scales down the back-feed so we don't overshoot our target.

Let's try again with a layer:
```
	layer = new Ptron.layer(2,2)
	layer.input(input)
	p_out.input(layer.output)

	
```


Basic components:
1. Perceptron ~ multiple inputs -> single output
2. Layer ~ multiple perceptrons that share the same inputs and generate a list of outputs
3. Network ~ multiple layers
Crux: rather than creating a monopolistic neural network to learn our scheme we divide the learner into sub-systems; each one with a specialized focus.

This allows us to do two things: 1) train classifiers in real-time, ad hoc and 2) make the topology itself learnable/evolutionary by delegating it to additional perceptrons.


## Nuts & Washers

The perceptron can technically handle any kind of input; Javascript only utilizes IEEE floats.
However, it would behoove you to feed it compressed values using a logistic, sign, or RELU function - in the AI trade these are known as activation functions.
This put all your data on "equal footing".

