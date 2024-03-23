'use strict';

const chalk = require('chalk');

// Stworzenie funckji odpowiadajacej za wyswietlanie akutalnego czasu w konsoli
function getCurrentTime() {
    return new Date().toLocaleTimeString({ hour12: false });
};

// Utworzenie zmiennej logger wykorzystywanej do wyswietlania informacji w konsoli
const logger = {
    info: (content) => console.log(`${chalk.cyan(`[${chalk.gray(getCurrentTime())}]`)}${chalk.cyan(`[${chalk.yellow(`?`)}]`)} ${chalk.cyan(content)}`),
    warn: (content) => console.log(`${chalk.cyan(`[${chalk.gray(getCurrentTime())}]`)}${chalk.cyan(`[${chalk.yellow(`!`)}]`)} ${chalk.yellow(content)}`),
    error: (content) => console.log(`${chalk.cyan(`[${chalk.gray(getCurrentTime())}]`)}${chalk.cyan(`[${chalk.red(`-`)}]`)} ${chalk.red(content)}`),
    debug: (content) => console.log(`${chalk.cyan(`[${chalk.gray(getCurrentTime())}]`)}${chalk.cyan(`[${chalk.blue(`/`)}]`)} ${chalk.blue(content)}`),
    success: (content) => console.log(`${chalk.cyan(`[${chalk.gray(getCurrentTime())}]`)}${chalk.cyan(`[${chalk.green(`+`)}]`)} ${chalk.green(content)}`)
};

module.exports = { logger };