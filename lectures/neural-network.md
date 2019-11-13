# Neural Networks

[Video](https://www.youtube.com/watch?time_continue=62&v=IHZwWFHWa-w&feature=emb_logo)

It's provocative as it is to describe a machine as learning once you actually see how it works
It feels a lot less like some crazy sci-fi premise and a lot more like well a calculus exercise
I mean basically it comes down to finding the minimum of a certain function.

Remember conceptually we're thinking of each neuron as being connected to all of the neurons in the previous layer and the weights in the weighted sum defining its activation are kind of like the strengths of those connections.

So then what you do is consider the average cost over all of the tens of thousands of training examples at your disposal. This average cost is our measure for how lousy the network is and how bad the computer should feel, and that's a complicated thing
Remember how the network itself was basically a function one that takes in 784 numbers as inputs the pixel values and spits out ten numbers as its output and in a sense it's parameterized by all these weights and biases.

## Cost Function

The main thing, I want you to know independent of implementation details is that what we mean when we talk about a network learning is that it's just minimizing a cost function and notice one consequence of that is that it's important for this cost function to have a nice smooth output.
So that we can find a local minimum by taking little steps downhill This is why by the way Artificial neurons have continuously ranging activations rather than simply being active or inactive in a binary way
if the way that biological neurons are This process of repeatedly nudging an input of a function by some multiple of the negative gradient is called gradient descent

It's a way to converge towards some local minimum of a cost function basically a valley in this graph

3:00
I'm still showing the picture of a function with two inputs of course because nudges in a thirteen thousand dimensional input
Space are a little hard to wrap your mind around, but there is actually a nice non-spatial way to think about this each component of the negative gradient tells us two things the sign of course tells us whether the corresponding

Component of the input vector should be nudged up or down, but importantly the relative magnitudes of all these components kind of tells you which changes matter more. You see in our network an adjustment to one of the weights might have a much greater
impact on the cost function than the adjustment to some other weight.

## Gradient Descent

This process of repeatedly nudging an input of a function by some multiple of the negative gradient is called gradient descent

It's a way to converge towards some local minimum of a cost function basically a valley in this graph.
I'm still showing the picture of a function with two inputs of course because nudges in a thirteen thousand dimensional input space are a little hard to wrap your mind around, but there is actually a nice non-spatial way to think about this.

Each component of the negative gradient tells us two things the sign of course tells us whether the corresponding Component of the input vector should be nudged up or down, but importantly the relative magnitudes of all these components.

