const rootPath = __dirname;
const { parseFiles } = require('./scripts/parse');
const params = {};

for (const args of process.argv) {
    if (args.indexOf('=') !== -1) {
        const [type, param] = args.split('=');
        params[type] = param;
    }
}

function parse() {
    console.log('Parsing files\n')
    const { type } = params;
    parseFiles(rootPath, type)
}

if(process.argv.indexOf('parse')!==-1){
    parse();
}