const { recFindByExt, readAndReturnFileText } = require('../utils/files');
const { returnFinalModel } = require('./normalize');
const { parseHTML } = require('./parser');


module.exports = {
    parseFiles(rootPath) {
        console.log('Generating the Data\n');
        const regexHTML = /http_\^\^/g;
        const regexNotHTML = /ftp_\^\^/g;
        const archiveDirectory = `${rootPath}/archives`;
        const constraintRegex = [regexHTML, regexNotHTML];
        const finalData = [];
        for (let i = 0; i < constraintRegex.length; i += 1) {
            const fileRegex = constraintRegex[i];
            const files = recFindByExt(archiveDirectory, fileRegex);
            for (let i2 = 0; i2 < files.length; i2 += 1) {
                const filePath = files[i2];

                const gotFile = readAndReturnFileText(filePath);
                const { parsedHTML, groupedText } = parseHTML(gotFile);
                const dataProcessed = returnFinalModel(
                    archiveDirectory, filePath,
                    parsedHTML, groupedText,
                );
                finalData.push((dataProcessed));
            }
        }
        return finalData;
    },


};
