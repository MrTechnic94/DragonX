'use strict';

const { exec } = require('child_process');
const { logger } = require('./consoleLogs.js');

// Sprawdzenie wersji node.js
const version = Number(process.version.split('.')[0].replace('v', ''));

const errorCatcher = () => {
    // Sprawdzenie czy ffmpeg jest zainstalowany
    exec('ffmpeg -version', (err) => {
        if (err) {
            logger.error('FFmpeg is not installed or available on your system.');
            logger.error('Install FFmpeg (https://ffmpeg.org/download.html) and try again.');
            logger.error('If you are using Windows, make sure to add FFmpeg to your PATH.');
        };
    });

    // Sprawdzenie obecności tokenu w pliku .env
    if (!process.env.TOKEN) {
        logger.error('Missing token in .env file!');
        process.exit(1);
    };

    // Sprawdzenie obecności konfiguracji bazy danych w pliku .env
    if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
        logger.error('Missing database config in .env file!');
        process.exit(1);
    };

    // Sprawdzenie czy wersja node.js jest wieksza niz v18
    if (version < 18) {
        logger.error('Outdated Node.js version! Update to a newer version.');
        process.exit(1);
    };

    // Obsługa nieprzechwyconych odrzucen i wyjatkow w procesie
    process.on('unhandledRejection', err => logger.error(err));

    process.on('uncaughtException', err => logger.error(err));
};

module.exports = { errorCatcher };