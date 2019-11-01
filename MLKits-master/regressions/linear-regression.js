const tf = require('@tensorflow/tfjs')

class LinearRegression {
    constructor(features, labels, options){
        this.features = features
        this.labels = labels
        //assigns a default value to a new object.
        //new LinearRegression(features, labels, { learningRate: 0.025 })
        // this would assign iterations 1000 but overwrite the learningRate.
        //
        this.options = Object.assign({ 
            learningRate: 0.1, 
            iterations: 1000 
        }, options)

        this.m = 0
        this.b = 0
        
    }

    gradientDescent(){
        const currentGuessesForMGP = this.features.map(row => {
            return this.m * row[0] + this.b
        })
    }

    train(){
        
        for(let i = 0; i < this.options.iterations; i++){
            this.gradientDescent()

        }
    }
}



module.exports = LinearRegression