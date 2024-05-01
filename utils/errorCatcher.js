'use strict';

const logger = require('./consoleLogger.js');
const { exec } = require('child_process');

// Sprawdzenie obecnosci wymaganych parametrow w pliku .env
const checkEnvVariables = () => {
    const requiredEnvVariables = ['TOKEN', 'OWNER_ID', 'PREFIX', 'DB_HOST', 'DB_PORT', 'DB_PASSWORD'];
    const optionalEnvVariables = ['TOKEN_DEV'];

    requiredEnvVariables.forEach((variable) => {
        if (!process.env[variable]) {
            logger.error(`Missing ${variable} in .env file`);
            process.exit(1);
        }
    });

    // Sprawdzenie czy DEV_MODE jest ustawiony na true, jesli tak to sprawdza czy parametr w TOKEN_DEV jest obecny
    if (process.env.DEV_MODE === 'true') {
        optionalEnvVariables.forEach((variable) => {
            if (!process.env[variable]) {
                logger.error(`Missing ${variable} in .env file`);
                process.exit(1);
            }
        });
    }
};

// Sprawdzenie czy wersja node.js jest wieksza niz v18
const checkNodeVersion = () => {
    const version = Number(process.version.split('.')[0].replace('v', ''));
    if (version < 18) {
        logger.error('Outdated Node.js version. Update to a newer version');
        process.exit(1);
    }
};

// Sprawdzenie czy ffmpeg jest zainstalowany
const checkFFmpeg = () => {
    exec('ffmpeg -version', (err) => {
        if (err) {
            logger.error('No FFmpeg installed');
            logger.error('Install FFmpeg or use ffmpeg-static');
        }
    });
};

// Zaladowanie utworzonych wczesniej zmiennych
const errorCatcher = () => {
    checkEnvVariables();
    checkNodeVersion();
    checkFFmpeg();
};

module.exports = { errorCatcher };