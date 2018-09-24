const rootPath = __dirname;
const { buildFiles } = require('./scripts/build');
const { testClassifiers } = require('./scripts/classify');

const params = {};

for (const args of process.argv) {
    if (args.indexOf('=') !== -1) {
        const [type, param] = args.split('=');
        params[type] = param;
    }
}

function parse() {
    console.log('Parsing files\n');
    const { type } = params;
    buildFiles(rootPath, type);
}

function test() {
    console.log('Testing algorithms \n');
    testClassifiers(rootPath);
}

if (process.argv.indexOf('parse') !== -1) {
    parse();
}
if (process.argv.indexOf('test') !== -1) {
    test();
}
