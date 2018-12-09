const join = require('path').join;
let filename = join(process.cwd(), './.monitor.json');
let Config = require(filename);

module.exports = Config;
