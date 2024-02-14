'use strict';

const chalk = require('chalk');

function getCurrentTime() {
    return new Date().toLocaleTimeString('en-US', { hour12: false });
};

const logger = {
    info: (content) => console.log(`${chalk.cyan(`[${chalk.gray(getCurrentTime())}]`)}${chalk.cyan(`[${chalk.yellow(`?`)}]`)} ${chalk.cyan(content)}`),
    warn: (content) => console.log(`${chalk.cyan(`[${chalk.gray(getCurrentTime())}]`)}${chalk.cyan(`[${chalk.yellow(`!`)}]`)} ${chalk.cyan(content)}`),
    error: (content) => console.log(`${chalk.cyan(`[${chalk.gray(getCurrentTime())}]`)}${chalk.cyan(`[${chalk.red(`-`)}]`)} ${chalk.red(content)}`),
    debug: (content) => console.log(`${chalk.cyan(`[${chalk.gray(getCurrentTime())}]`)}${chalk.cyan(`[${chalk.blue(`/`)}]`)} ${chalk.blue(content)}`),
    success: (content) => console.log(`${chalk.cyan(`[${chalk.gray(getCurrentTime())}]`)}${chalk.cyan(`[${chalk.green(`+`)}]`)} ${chalk.green(content)}`)
};

module.exports = { logger };
