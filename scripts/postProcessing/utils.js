function flattenTexts(data) {
    return Object.values(data)
        .reduce((accumulate, { text }) => [...accumulate, ...text], []);
}

function flattenAttrs(data) {
    return Object.values(data).reduce((accumulate, { attr }) => {
        if (!attr) {
            return accumulate;
        }
        return [...accumulate, ...attr];
    }, []);
}

module.exports = {
    getFlattenAttrs(data) {
        return Object.values(data)
            .reduce((accumulate, item) => [...accumulate, ...flattenAttrs(item)], []);
    },
    getFlattenText(data) {
        return Object.values(data)
            .reduce((accumulate, item) => [...accumulate, ...flattenTexts(item)], []);
    },
};

