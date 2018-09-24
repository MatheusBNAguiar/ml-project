const { parseFiles } = require('./parse');
const { writeFiles } = require('./generate');
const { postProcessData } = require('./postProcessing');

module.exports = {
    buildFiles(rootPath, destiny = undefined) {
        const builtData = parseFiles(rootPath);
        postProcessData(builtData);
        writeFiles(rootPath, builtData, destiny);
    },
};
