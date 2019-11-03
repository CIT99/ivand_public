require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const loadCSV = require('./load-csv')
const LinearRegression = require('./linear-regression')
const plot = require('node-remote-plot')



let { features, labels, testFeatures, testLabels} = loadCSV('./cars.csv', {
    shuffle: true,
    splitTest: 50,
    dataColumns: ['horsepower','weight','displacement'],
    labelColumns: ['mpg']
})


const regression = new LinearRegression(features, labels, {
    learningRate: .1,
    iterations:100,
    batchSize: 10,
})

//regression.features.print()

regression.train()
const r2 = regression.test(testFeatures,testLabels)

plot({
    x: regression.mseHistory.reverse(),
    xLabel: 'Iteration #',
    yLabel: 'Mean Squared Error'
})

//console.log('mse history:', regression.mseHistory);
console.log('rs is:', r2);

