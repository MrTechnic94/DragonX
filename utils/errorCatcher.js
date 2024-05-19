'use strict';

const pkg = require('../package.json');
const logger = require('./consoleLogger');
const { exec } = require('node:child_process');

// Funkcja sprawdzająca obecnosc wymaganych parametrow w pliku .env
function checkEnvVariables(variables) {
    for (const variable of variables) {
        if (!process.env[variable]) {
            logger.error(`Missing ${variable} in .env file`);
            process.exit(1);
        }
    }
};

// Sprawdzenie czy wersja node.js jest większa niż v18
function checkNodeVersion() {
    const version = Number(process.version.slice(1).split('.')[0]);
    if (version < 18) {
        logger.error('Outdated Node.js version. Update to a newer version');
        process.exit(1);
    }
};

// Sprawdzenie obecnosci FFmpeg
function checkFFmpeg() {
    const hasFFmpegStatic = pkg.dependencies['ffmpeg-static'] || pkg.optionalDependencies?.['ffmpeg-static'] || pkg.devDependencies?.['ffmpeg-static'];

    exec('ffmpeg -version', (err) => {
        if (err && !hasFFmpegStatic) {
            logger.error('No FFmpeg installed');
            logger.error('Install FFmpeg or use ffmpeg-static');
            process.exit(1);
        }
    })
};

// Funkcja glowna odpowiedzialna za przechwytywanie bledow i sprawdzanie wymagan
function errorCatcher() {
    // Sprawdzenie wymaganych zmiennych srodowiskowych
    checkEnvVariables(['TOKEN', 'OWNER_ID', 'PREFIX', 'DB_HOST', 'DB_PORT', 'DB_PASSWORD']);

    // Sprawdzenie opcjonalnych zmiennych srodowiskowych w Dev Mode
    if (process.env.DEV_MODE === 'true') checkEnvVariables(['TOKEN_DEV']);

    // Sprawdzenie wersji node.js
    checkNodeVersion();

    // Sprawdzenie obecnosci FFmpeg
    checkFFmpeg();
};

module.exports = { errorCatcher };
