'use strict';

const Redis = require('ioredis');
const logger = require('./consoleLogger.js');

// Utworzenie klienta redis
const redis = new Redis({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
});

logger.info(`Polaczono z baza danych!`);

// Obsluga zdarzenia zwiazana z bledami bazy danych
redis.on('error', (err) => {
    logger.error(`Blad podczas laczenia z baza danych!\n${err}`);
    process.exit(1);
});

module.exports = redis;