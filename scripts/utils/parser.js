var htmlparser = require("htmlparser2");

function parseHTML(htmlFile) {
    let parserData = [];
    var parser = new htmlparser.Parser({
        onopentag: function (name, attribs) {
            parserData.push([name, attribs]);
        },
        ontext: function (text) {
            const lastItem = parserData[parserData.length - 1];
            if (lastItem) {
                lastItem.push(text);
                parserData[parserData.length - 1] = lastItem;
            }
        },
    }, {
        decodeEntities: true
    });
    parser.write(htmlFile);
    parser.end();
    return parserData;
}

module.exports = {
    parseHTML
};