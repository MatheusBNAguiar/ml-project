const { processAndSetFrequency } = require('./pnl');
const predefinedRules = require('./rules');

function applyRules(singleData) {
    for (const ruleName in predefinedRules) {
        if (ruleName) {
            const rule = predefinedRules[ruleName];
            singleData[ruleName] = rule(singleData);
        }
    }
    return singleData;
}

module.exports = {
    postProcessData(builtData) {
        builtData.forEach(data => {
            data.pnl = processAndSetFrequency(data.groupedText);
            data.pnlNotFiltered = data.groupedText.replace(/;/g, '').replace(/\n/g, '');
            applyRules(data);
            Object.keys(data).forEach(index => {
                if (index.indexOf('_') !== -1) {
                    delete data[index];
                }
            });
        });
    },
};

