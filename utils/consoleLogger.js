'use strict';

const chalk = require('chalk');

// Stworzenie funckji odpowiadajacej za wyswietlanie akutalnego czasu w konsoli
function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
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