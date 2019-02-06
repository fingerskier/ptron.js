# ptron.js
Javascript perceptron class and framework


## Meta

The goal of this project is to create a small, useable classifier which is composable in a larger network.

The idea of a perceptron as a system of linear equations is encapsulated here in a basic sense.
This perceptron (though the term may be unduly abrogated) is a rectangular set of nodes: each layer has the same dimension.

Crux: rather than creating a huge neural network to learn our scheme we divide the learner into sub-systems; each one has a focus.

This allows us to do two things: 1) train classifiers in real-time, ad hoc and 2) make the topology itself learnable/evolutionary by delegating it to additional perceptrons.


## Nuts & Washers

Javascript is not the best language for this endeadvor.
However, I feel that it is the best platform - it is elegant, ubiquitous, and _already_ integrated into all layers of the stack (depending on how you slice it :)
That said, I hope that the general concept is easily translatable [if it's useful].

The notion of mapping "coordinates" to a 1D list is just for cognitive accessbility.
Perhaps it makes sense to just operate from a list and simplify the whole thing...perhaps not.
I hope to dig into the training flow at a later time and revisit this.
