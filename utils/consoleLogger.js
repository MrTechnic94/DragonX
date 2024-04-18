'use strict';

const pino = require('pino');

// Utworzenie zmiennej logger z ustawieniami pino-pretty
const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
});

module.exports = logger;