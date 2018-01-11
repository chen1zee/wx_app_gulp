const chalk = require('chalk');

const colorConsole = {
    info(content) {
        console.log(`${chalk.green('[INFO]')} ${content}`);
    },
    error(content) {
        console.log(`${chalk.red('[出错]')} ${content}`);
    }
};

module.exports = colorConsole;