'use strict';

const { cyan, gray, yellow, red, blue, green } = require('colorette');

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
    info: (content) => console.log(`${cyan(`[${gray(getCurrentTime())}]`)}${cyan(`[${yellow(`?`)}]`)} ${cyan(content)}`),
    warn: (content) => console.log(`${cyan(`[${gray(getCurrentTime())}]`)}${cyan(`[${yellow(`!`)}]`)} ${yellow(content)}`),
    error: (content) => console.log(`${cyan(`[${gray(getCurrentTime())}]`)}${cyan(`[${red(`-`)}]`)} ${red(content)}`),
    debug: (content) => console.log(`${cyan(`[${gray(getCurrentTime())}]`)}${cyan(`[${blue(`/`)}]`)} ${blue(content)}`),
    success: (content) => console.log(`${cyan(`[${gray(getCurrentTime())}]`)}${cyan(`[${green(`+`)}]`)} ${green(content)}`)
};

module.exports = logger;