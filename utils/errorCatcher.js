'use strict';

const { exec } = require('child_process');
const { logger } = require('./consoleLogger.js');

// Sprawdzenie czy ffmpeg jest zainstalowany
const checkFFmpeg = () => {
    exec('ffmpeg -version', (err) => {
        if (err) {
            logger.error('FFmpeg is not installed or available on your system.');
            logger.error('Install FFmpeg (https://ffmpeg.org/download.html) and try again.');
            logger.error('If you are using Windows, make sure to add FFmpeg to your PATH.');
        }
    });
};

// Sprawdzenie obecnosci wymaganych parametrow w pliku .env
const checkEnvVariables = () => {
    const requiredEnvVariables = ['TOKEN', 'OWNER', 'PREFIX', 'DB_HOST', 'DB_USER', 'DB_PASSWORD'];
    const optionalEnvVariables = ['TOKEN_DEV'];

    requiredEnvVariables.forEach((variable) => {
        if (!process.env[variable]) {
            logger.error(`Missing ${variable} in .env file!`);
            process.exit(1);
        }
    });

    // Sprawdzenie czy DEV_MODE jest ustawiony na true, jesli tak to sprawdza czy parametr w TOKEN_DEV jest obecny
    if (process.env.DEV_MODE === 'true') {
        optionalEnvVariables.forEach((variable) => {
            if (!process.env[variable]) {
                logger.error(`Missing ${variable} in .env file!`);
                process.exit(1);
            }
        });
    }
};

// Sprawdzenie czy wersja node.js jest wieksza niz v18
const checkNodeVersion = () => {
    const version = Number(process.version.split('.')[0].replace('v', ''));
    if (version < 18) {
        logger.error('Outdated Node.js version! Update to a newer version.');
        process.exit(1);
    }
};

// Obsługa nieprzechwyconych odrzucen i wyjatkow w procesie
const otherErrors = () => {
    process.on('unhandledRejection', reason => logger.error(reason));
    process.on('uncaughtException', err => logger.error(err));
};

// Zaladowanie utworzonych wczesniej zmiennych
const errorCatcher = () => {
    checkFFmpeg();
    checkEnvVariables();
    checkNodeVersion();
    otherErrors();
};

module.exports = { errorCatcher };