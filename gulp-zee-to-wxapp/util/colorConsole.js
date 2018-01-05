const chalk = require('chalk');

const colorConsole = {
    error(content) {
        console.log(`${chalk.red('[出错]')} ${content}`)
    }
};

module.exports = colorConsole;