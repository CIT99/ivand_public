require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('./load-csv');
//const LinearRegression = require('./linear-regression');
const plot = require('node-remote-plot');

const {
  features,
  labels,
  testFeatures,
  testLabels
} = loadCSV('./data/cars.csv', {
  dataColumns: [
    'horsepower',
    'displacement',
    'weight'
  ],
  labelColumns: ['passedemissions'],
  shuffle: true,
  splitTest: 50,
  converters: {
    passedemissions: (value) => {
      return value === 'TRUE' ? 1 : 0
    }
  }

})


const features_tensor = tf.tensor(features)
const labels_tensor = tf.tensor(labels)

//console.log(labels_tensor)

const createModel = () => {
  const model = tf.sequential()
  model.add(tf.layers.dense({
    units: 16,
    activation: 'sigmoid',
    inputShape: [3]
  }))
  model.add(tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  }))
  model.compile({
    loss: 'meanSquaredError',
    optimizer: 'sgd',
    metrics: ['accuracy']
  })
  return model
}

const model = createModel()

console.log(model.summary())

// function onBatchEnd(batch, logs) {
//   console.log('Accuracy', logs.acc);
// }

// Train for 5 epochs with batch size of 32.
// model.fit(features_tensor, labels_tensor, {
//    epochs: 10,
//    batchSize: 50,
//    callbacks: {onBatchEnd}
//  }).then(info => {
//    console.log('accuracy', info.history.acc);
//  });

async function trainModel(model) {
  await model.fit(features_tensor, labels_tensor, {
    batchSize: 50,
    epochs: 10,
    //callbacks: {onBatchEnd}
  })

  await predict(model)

}

async function predict(model){
  const results = await model.predict(tf.tensor([[150, 400, 1.88]]))
  console.log(results.print())
}

trainModel(model)