const outputs = []
const predictionPoint = 300
const k = 3

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition,bounciness,size,bucketLabel])

}

function runAnalysis() {
  const bucket = _.chain(outputs)
    .map(row => [distance(row[0]),row[3]])
    .sortBy(row => row[0])
    .slice(0,k)
    .countBy(row => row[1])
    .toPairs()
    .sortBy(row => row[1])
    .last()
    .first()
    .parseInt()
    .value()

  console.log(`Your point will probably fall into ${bucket}`)    
}

function distance(point){
  return Math.abs(point - predictionPoint)
}

function splitDataset(data, testCount){
  const shuffled = _.shuffled(data)

  const testSet = _.slice(shuffled, 0, testCount)
  const trainingSet = _.slice(shuffled, testCount)

  return [testSet, trainingSet]

}
