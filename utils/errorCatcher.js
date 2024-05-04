'use strict';

const logger = require('./consoleLogger');
const { exec } = require('child_process');

// Funkcja sprawdzająca obecnosc wymaganych parametrow w pliku .env
function checkEnvVariables(variables) {
    for (const variable of variables) {
        if (!process.env[variable]) {
            logger.error(`Missing ${variable} in .env file`);
            process.exit(1);
        }
    }
};

// Sprawdzenie czy wersja nodejs jest większa niż v18
function checkNodeVersion() {
    const version = Number(process.version.slice(1).split('.')[0]);
    if (version < 18) {
        logger.error('Outdated Node.js version. Update to a newer version');
        process.exit(1);
    }
};

// Sprawdzenie obecnosci FFmpeg
function checkFFmpeg() {
    exec('ffmpeg -version', (err) => {
        if (err) {
            logger.error('No FFmpeg installed');
            logger.error('Install FFmpeg or use ffmpeg-static');
        }
    });
};

// Funkcja glowna odpowiedzialna za przechwytywanie bledow i sprawdzanie wymagan
function errorCatcher() {
    // Sprawdzenie wymaganych zmiennych srodowiskowych
    checkEnvVariables(['TOKEN', 'OWNER_ID', 'PREFIX', 'DB_HOST', 'DB_PORT', 'DB_PASSWORD']);

    // Sprawdzenie opcjonalnych zmiennych srodowiskowych w trybie deweloperskim
    if (process.env.DEV_MODE === 'true') checkEnvVariables(['TOKEN_DEV']);

    // Sprawdzenie wersji Nodejs
    checkNodeVersion();

    // Sprawdzenie obecnosci FFmpeg
    checkFFmpeg();
};

module.exports = { errorCatcher };