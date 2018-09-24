const htmlparser = require('htmlparser2');

/**
 * A object containing
 * @typedef HtmlData
 * @property parsedHTML
 * @property parsedHTML
 */

/**
 * A number, or a string containing a number.
 * @typedef ParsedData
 * @property { HtmlData }
 * @property { HtmlData } parsedHTML
 * @property { String } groupedText All the text, without attributes and tags, concatenated
 */

/**
 *
 *
 * @param { String } htmlFile All stringified data on the html file
 * @returns { ParsedData }
 */
function parseHTML(htmlFile) {
    const parsedHTML = [];
    let groupedText = '';
    const parser = new htmlparser.Parser({
        onopentag(name, attribs) {
            parsedHTML.push([name, attribs]);
        },
        ontext(text) {
            const lastItem = parsedHTML[parsedHTML.length - 1];
            if (lastItem) {
                groupedText += (`${text} `);
                lastItem.push(text);
                parsedHTML[parsedHTML.length - 1] = lastItem;
            }
        },
    }, {
        decodeEntities: true,
    });
    parser.write(htmlFile);
    parser.end();
    return {
        parsedHTML,
        groupedText,
    };
}

module.exports = {
    parseHTML,
};
