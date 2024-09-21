# ptron.js
Javascript perceptron class and framework


## Meta

This is a small, javascript only perceptron.
A perceptron is basically a solver for a system of linear equations.
The co-efficients of the equations can be determined automatically if we know which inputs map to which outputs through back-propogation training.
Small perceptrons can be trained and run locally.


## What use is it?

The solutions given are fuzzy but with diligent design and training they can be accurate enough.
e.g. you could probably achieve 90% accuracy for a simple classification task

Models can be generated and dissemenated as JSON files.
Models can also be trained _in the wild_ as needed.

Multiple small models can be munged to perform more complex tasks
e.g. multiple MLPs for each type of data, the results of which feed into another perceptron for a higher-level classification
