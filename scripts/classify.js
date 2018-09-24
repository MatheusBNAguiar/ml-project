const natural = require('natural');
const { readAndProcessJsonResult } = require('./utils/files');

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - (min + 1))) + min;
}

function splitTrainingSet(data, splitPercentage) {
    const dataCopy = data.slice(0);
    let dataLength = dataCopy.length;
    const trainSet = [];
    const limit = parseInt(dataLength * (splitPercentage / 100.0));
    for (let i = 0; i < limit; i += 1) {
        const chosenPosition = randomIntFromInterval(0, dataLength - 1);
        trainSet.push(...dataCopy.splice(chosenPosition, 1));
        dataLength -= 1;
    }
    return trainSet;
}

function addDataToClassifierAndTrain(classifierInstance, trainSet) {
    for (let i = 0; i < trainSet.length; i += 1) {
        const data = trainSet[i];
        const { groupedText, type } = data;
        classifierInstance.addDocument(groupedText, type);
    }
    classifierInstance.train();
}

function testClassifier(classifierInstance, testSet) {
    let success = 0;
    for (let i = 0; i < testSet.length; i += 1) {
        const data = testSet[i];
        const { groupedText, type } = data;
        const result = classifierInstance.classify(groupedText);
        if (result === type) {
            success += 1;
        }
    }
    return success;
}

function avaliateAccuracy(data, ClassifierInstance, splitPercentage, quantityTests) {
    const classifierInstance = new ClassifierInstance();
    const dataLength = data.length;
    const successArchive = [];
    for (let i = 1; i <= quantityTests; i += 1) {
        console.log(`\t[Test ${i}] \t`);
        console.log('\t \t[Split data] \t');
        const trainingSet = splitTrainingSet(data, splitPercentage);
        console.log('\t \t[Training data] \t');
        addDataToClassifierAndTrain(classifierInstance, trainingSet);
        console.log('\t \t[Testing data] \t');
        const success = testClassifier(classifierInstance, data);
        const succesRate = (100 * parseFloat(success / dataLength)).toFixed(2);
        successArchive.push(succesRate);
        console.log(`\t \t Success Rate ${succesRate}% \t`);
    }
    const biggestRate = Math.max(successArchive);
    console.log(`\tBiggest Success Rate ${biggestRate}% `);
}

function testClassifiers(basepath, splitPercentage = 70, quantityTests = 10) {
    const fullData = readAndProcessJsonResult(basepath);
    console.log('[Testing Bayesian Classifier] \t');
    avaliateAccuracy(fullData, natural.BayesClassifier, splitPercentage, quantityTests);
}


module.exports = { testClassifiers };
