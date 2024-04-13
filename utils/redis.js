'use strict';

const Redis = require('ioredis');

// Utworzenie klienta redis
const redis = new Redis({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
});

module.exports = redis;