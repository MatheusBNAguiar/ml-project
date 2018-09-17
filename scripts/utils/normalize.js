function removeBreakLineContent(textArray) {
    return textArray.reduce((finalGroup, actualTerm) => {
            const processedTerm = actualTerm.replace(/\n/g, '');
            if (processedTerm.length) {
                finalGroup.push(processedTerm);
            }
            return finalGroup;
        }, [])
        .filter(str => str.replace(/\n|\s/g, ''))
}

function normalizeArray(htmlArray) {
    return htmlArray.reduce((normalizedData, actualData) => {
        const [type, attr, ...text] = actualData;
        const processedText = removeBreakLineContent(text);
        if (processedText.length) {
            const actualData = normalizedData[type] || [];
            const compiledData = {
                text: processedText
            };
            if (Object.values(attr).length) {
                compiledData['attr'] = Object.values(attr);
            }
            actualData.push(compiledData);
            normalizedData[type] = actualData;
        }
        return normalizedData;
    }, {});
}

function getTypeAndUni(basePath, absolutePath) {
    const normalizedPath = absolutePath.replace(basePath, '');
    const [_, type, university, url] = normalizedPath.split('/');
    return [type, university, url.replace('http_^^','')];

}

function returnFinalModel(basePath, absolutePath, htmlArray) {
    const [type, university,url] = getTypeAndUni(basePath, absolutePath);
    const data = normalizeArray(htmlArray);
    return {
        type,
        university,
        data,
        url
    }
}

module.exports = {
    returnFinalModel,
}