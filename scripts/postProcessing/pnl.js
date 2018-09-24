const { countBy } = require('lodash');
const natural = require('natural');
const sw = require('stopword');
const nlp = require('compromise');


const tokenizer = new natural.WordTokenizer();

function processAndSetFrequency(groupedText, minimumFrequency = 3) {
    const tokenizedWords = sw.removeStopwords(tokenizer.tokenize(groupedText.toLowerCase()));
    const groupedByFrequency = countBy(tokenizedWords);
    return Object.keys(groupedByFrequency).reduce((filtered, key) => {
        const isBiggerThenMinimum = parseInt(groupedByFrequency[key]) > minimumFrequency;
        const isNotNumber = isNaN(parseInt(key));
        const keyIsBiggerThenNecessary = key.length > 3;
        if (isBiggerThenMinimum && isNotNumber && keyIsBiggerThenNecessary) {
            filtered[key] = groupedByFrequency[key];
        }
        return filtered;
    }, {});
}

function getPeopleOnText(text) {
    return nlp(text).people().out('topk');
}

module.exports = {
    processAndSetFrequency,
    getPeopleOnText,
};

