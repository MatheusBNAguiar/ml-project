var path = require('path')
var fs = require('fs')

function recFindByExt(base, extRegex = '*', files, result) {
    files = files || fs.readdirSync(base)
    result = result || []
    files.forEach(
        function (file) {
            var newbase = path.join(base, file)
            if (fs.statSync(newbase).isDirectory()) {
                result = recFindByExt(newbase, extRegex, fs.readdirSync(newbase), result)
            } else {
                if (file.match(extRegex)) {
                    result.push(newbase)
                }
            }
        }
    )
    return result
}

function readAndReturnFileText(path) {
    return fs.readFileSync(path, "utf8");
}

function writeTempResult(mainPath, resultArray) {
    fs.writeFile(mainPath + "/temp/processed.json", resultArray.join('\n'), function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function writeCSVResult(mainPath, resultArray) {
    const firstElement = resultArray[0];
    const keys = Object.keys(firstElement).join(';') + '\n';
    const data = resultArray.reduce((finalString, item) => {
        finalString += Object.values(item).join(';')
        finalString += '\n'
        return finalString
    }, '');
    fs.writeFile(mainPath + "/temp/finalResult.csv", keys + data, function (err) {
        if (err) {
            console.log(err);
        }
    });
}



module.exports = {
    recFindByExt,
    readAndReturnFileText,
    writeTempResult,
    writeCSVResult
};