const tf = require('@tensorflow/tfjs')
const _ = require('lodash')


class LinearRegression {
    constructor(features, labels, options){
        this.features = this.processFeatures(features)
        this.labels = tf.tensor(labels)

        
        //tf.ones([6,1]) = [1,1,1,1,1,1]
        // remember to set the axis of the concat 1 = right 0 = down axis 
        
        //assigns a default value to a new object.
        //new LinearRegression(features, labels, { learningRate: 0.025 })
        // this would assign iterations 1000 but overwrite the learningRate.
        //
        this.options = Object.assign({ 
            learningRate: 0.1, 
            iterations: 1000 
        }, options)

        this.weights = tf.zeros([2,1])
        
        // this.m = 0
        // this.b = 0
        
    }

    gradientDescent(){
        
        const currentGuesses = this.features.matMul(this.weights)
        const differences = currentGuesses.sub(this.labels)

        const slopes = this.features
            .transpose()
            .matMul(differences)
            .div(this.features.shape[0])

        this.weights = this.weights.sub((slopes.mul(this.options.learningRate)))
    }


    // old array based gradient descent
    // gradientDescent(){
    //     const currentGuessesForMGP = this.features.map(row => {
    //         return this.m * row[0] + this.b
    //     })

    //     const bSlope = _.sum(currentGuessesForMGP.map((guess, i) => {
    //         return guess - this.labels[i][0]
    //     })) * 2 / this.features.length

    //     const mSlope = _.sum(currentGuessesForMGP.map((guess, i) => {
    //         return -1 * this.features[i][0] * (this.labels[i][0] - guess)
    //     })) * 2 / this.features.length

    //     this.m = this.m - mSlope * this.options.learningRate
    //     this.b = this.b - bSlope * this.options.learningRate
    // }

    train(){
        
        for(let i = 0; i < this.options.iterations; i++){
            this.gradientDescent()

        }
    }

    test(testFeatures, testLabels) {
        testFeatures = this.processFeatures(testFeatures) 
        testLabels = tf.tensor(testLabels)


        const predictions = testFeatures.matMul(this.weights)

        //predictions.print()
        const res = testLabels.sub(predictions)
            .pow(2) //element wise squared.... each element will be squared.
            .sum() // will add no numbers in tensor since we did not provide axis
            .get()

            //arithmetic mean .mean()
        const tot = testLabels.sub(testLabels.mean())
            .pow(2)
            .sum()
            .get()

        return 1 - res / tot     
    }

    processFeatures(features) {
        features = tf.tensor(features)
        features = tf.ones([features.shape[0], 1]).concat(features, 1)

        if (this.mean && this.variance){
            features = features.sub(this.mean).div(this.variance.pow(0.5))
        } else {
            features = this.standardize(features)
        }

        return features
    }

    standardize(features){
        const { mean, variance } = tf.moments(features, 0)
        
        this.mean = mean
        this.variance = variance

        return features.sub(mean).div(variance.pow(0.5))
    }
}



module.exports = LinearRegression