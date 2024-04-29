'use strict';

const pino = require('pino');
let logger;

try {
    // Sprawdzenie, czy modul pino-pretty jest dostepny, jesli jest dostepny to go uzyje
    logger = pino({
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:HH:MM:ss'
            }
        }
    });
} catch {
    // Uzycie zwyklego pino, jesli modul nie istnieje lub wystapil blad
    logger = pino();
};

module.exports = logger;
