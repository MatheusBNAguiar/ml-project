const path = require('path');
const fs = require('fs');

/**
 * Some util functions to manipulate files
 * @module Files
 * */


/**
 * The absolute path directing to the validated archive
 * @typedef { String } PathString
*/

/**
 * Get archives paths on recursive mode, filtering if it has the regex pattern
 *
 * @param { PathString } basePath The basePath
 * @param { RegExp } [extRegex='*'] The entity regex used to recognize which archives are useful
 * to the processing algorithm
 * @param { PathString[] }  files The files that will be used as the base for the recursive process
 * @param { PathString[] } result All the absolute paths of the files that enter on the pattern
 * @returns { PathString[] } The result compilation
 */
function recFindByExt(basePath, extRegex = '*', files, result) {
    files = files || fs.readdirSync(basePath);
    result = result || [];
    files.forEach(file => {
        const newBasePath = path.join(basePath, file);
        if (fs.statSync(newBasePath).isDirectory()) {
            result = recFindByExt(newBasePath, extRegex, fs.readdirSync(newBasePath), result);
        } else if (file.match(extRegex)) {
            result.push(newBasePath);
        }
    });
    return result;
}

/**
 * Get the file data and return it as a text
 *
 * @param { PathString } filePath The file path
 * @returns { String }
 */
function readAndReturnFileText(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

/**
 * Get the JSON file data and return it as an array of JSONs
 *
 * @param { PathString } mainPath The file path
 * @returns { JSON[] }
 */
function readAndProcessJsonResult(mainPath) {
    const data = readAndReturnFileText(`${mainPath}/temp/processed.json`);
    return data.split('\n').map(item => JSON.parse(item));
}


/**
 * Get a chunk of JSONs and then write it on a .json file located on ./temp
 * @param { PathString } mainPath The file path
 * @param { JSON[] } resultArray The array containing a chunk of JSONs
 */
function writeTempResult(mainPath, resultArray) {
    fs.writeFile(`${mainPath}/temp/processed.json`, resultArray.join('\n'), err => {
        if (err) {
            console.log(err);
        }
    });
}

/**
 * Get a chunk of JSONs and then write it on a .csv file located on ./temp
 * @param { PathString } mainPath The file path
 * @param { JSON[] } resultArray The array containing a chunk of JSONs
 */
function writeCSVResult(mainPath, resultArray) {
    const firstElement = resultArray[0];
    const keys = `${Object.keys(firstElement).join(';')}\n`;
    const data = resultArray.reduce((finalString, item) => {
        finalString += Object.values(item).join(';');
        finalString += '\n';
        return finalString;
    }, '');
    fs.writeFile(`${mainPath}/temp/finalResult.csv`, keys + data, err => {
        if (err) {
            console.log(err);
        }
    });
}


module.exports = {
    recFindByExt,
    readAndReturnFileText,
    readAndProcessJsonResult,
    writeTempResult,
    writeCSVResult,
};
