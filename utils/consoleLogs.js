'use strict';

const chalk = require('chalk');

const currentTime = `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}:${new Date().getSeconds().toString().padStart(2, '0')}`;

const logger = {
    info: (content) => console.log(`${chalk.cyan(`[${chalk.blackBright(currentTime)}]`)}${chalk.cyan(`[${chalk.yellow(`?`)}]`)} ${chalk.cyan(content)}`),
    warn: (content) => console.warn(`${chalk.cyan(`[${chalk.blackBright(currentTime)}]`)}${chalk.cyan(`[${chalk.yellow(`!`)}]`)} ${chalk.cyan(content)}`),
    error: (content) => console.error(`${chalk.cyan(`[${chalk.blackBright(currentTime)}]`)}${chalk.cyan(`[${chalk.red(`-`)}]`)} ${chalk.red(content)}`),
    success: (content) => console.log(`${chalk.cyan(`[${chalk.blackBright(currentTime)}]`)}${chalk.cyan(`[${chalk.green(`+`)}]`)} ${chalk.green(content)}`)
};

module.exports = { logger };