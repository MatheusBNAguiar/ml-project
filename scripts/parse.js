const { recFindByExt, readAndReturnFileText, writeTempResult, writeCSVResult } = require('./utils/files');
const { returnFinalModel } = require('./utils/normalize');
const { parseHTML }= require('./utils/parser');
const { applyRules } = require('./utils/rules');
function buildFiles(rootPath) {
    console.log('Generating the Data\n')
    const regexHTML = new RegExp('.*\\.' + 'html', 'gm');
    const regexNotHTML = new RegExp('^(.(?!.*\.html))*$', 'gm');
    const archiveDirectory = rootPath + '/archives';
    const finalData = [];
    for (const fileRegex of [regexHTML, regexNotHTML]) {
        const files = recFindByExt(archiveDirectory, fileRegex);
        for (const filePath of files) {
            const gotFile = readAndReturnFileText(filePath)
            const parsedHTML = parseHTML(gotFile);
            const dataProcessed = returnFinalModel(archiveDirectory, filePath, parsedHTML);
            const dataWithRules = applyRules(dataProcessed);
            finalData.push((dataWithRules));
        }
    }
    return finalData;
}


function writeFiles(rootPath, finalData, destiny) {
    switch (destiny) {
        case 'csv':
            console.log('Writing the CSV file\n')
            finalData.forEach(data => {
                delete data.data;
                delete data.url;
            });
            writeCSVResult(rootPath, finalData)
            break;
        default:
            console.log('Writing the JSON file\n')
            finalData = finalData.map(data => JSON.stringify(data));
            writeTempResult(rootPath, finalData)
            break;
    }
}

function parseFiles(rootPath, destiny = undefined) {
    const finalData = buildFiles(rootPath);
    writeFiles(rootPath, finalData, destiny);
}

module.exports = {
    parseFiles,
}
