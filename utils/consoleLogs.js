'use strict';

// const { color } = require('./consoleColor.js');
const chalk = require('chalk');

// Stworzenie funckji odpowiadajacej za wyswietlanie akutalnego czasu w konsoli
function getCurrentTime() {
    return new Date().toLocaleTimeString('pl', { hour12: false });
};

// Utworzenie zmiennej logger wykorzystywanej do wyswietlania informacji w konsoli
const logger = {
    info: (content) => console.log(`${chalk.cyan(`[${chalk.gray(getCurrentTime())}]`)}${chalk.cyan(`[${chalk.yellow(`?`)}]`)} ${chalk.cyan(content)}`),
    warn: (content) => console.log(`${chalk.cyan(`[${chalk.gray(getCurrentTime())}]`)}${chalk.cyan(`[${chalk.yellow(`!`)}]`)} ${chalk.cyan(content)}`),
    error: (content) => console.log(`${chalk.cyan(`[${chalk.gray(getCurrentTime())}]`)}${chalk.cyan(`[${chalk.red(`-`)}]`)} ${chalk.red(content)}`),
    debug: (content) => console.log(`${chalk.cyan(`[${chalk.gray(getCurrentTime())}]`)}${chalk.cyan(`[${chalk.blue(`/`)}]`)} ${chalk.blue(content)}`),
    success: (content) => console.log(`${chalk.cyan(`[${chalk.gray(getCurrentTime())}]`)}${chalk.cyan(`[${chalk.green(`+`)}]`)} ${chalk.green(content)}`)
};

// Utworzenie zmiennej logger odpowiwadajaca za wyswietlanie wybranych informacji w konsoli
// const logger = {
//     info: (content) => console.log(`${color.cyan('[')}${color.gray(getCurrentTime())}${color.cyan(']')}${color.cyan('[')}${color.yellow('?')}${color.cyan(']')} ${color.cyan(content)}`),
//     warn: (content) => console.log(`${color.cyan('[')}${color.gray(getCurrentTime())}${color.cyan(']')}${color.cyan('[')}${color.yellow('!')}${color.cyan(']')} ${color.cyan(content)}`),
//     error: (content) => console.log(`${color.cyan('[')}${color.gray(getCurrentTime())}${color.cyan(']')}${color.cyan('[')}${color.red('-')}${color.cyan(']')} ${color.red(content)}`),
//     debug: (content) => console.log(`${color.cyan('[')}${color.gray(getCurrentTime())}${color.cyan(']')}${color.cyan('[')}${color.blue('/')}${color.cyan(']')} ${color.blue(content)}`),
//     success: (content) => console.log(`${color.cyan('[')}${color.gray(getCurrentTime())}${color.cyan(']')}${color.cyan('[')}${color.green('+')}${color.cyan(']')} ${color.green(content)}`)
// };

module.exports = { logger };