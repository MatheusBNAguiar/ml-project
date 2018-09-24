const { writeTempResult, writeCSVResult } = require('../utils/files');

module.exports = {
    writeFiles(rootPath, finalData, destiny) {
        switch (destiny) {
        case 'csv':
            console.log('Writing the CSV file\n');
            finalData.forEach(data => {
                delete data.data;
                delete data.url;
                delete data.pnl;
                delete data.groupedText;
                delete data.pnlNotFiltered;
            });
            writeCSVResult(rootPath, finalData);
            break;
        default:
            console.log('Writing the JSON file\n');
            finalData = finalData.map(data => JSON.stringify(data));
            writeTempResult(rootPath, finalData);
            break;
        }
    },

};

