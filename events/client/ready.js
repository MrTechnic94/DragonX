'use strict';

const redis = require('../../utils/redis.js');
const logger = require('../../utils/consoleLogger.js');
const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    run: async (client) => {
        // Obsluga zdarzen zwiazanych z polaczeniem i bledami bazy danych
        redis.once('connect', () => {
            logger.info(`Polaczono z baza danych!`);
        });

        redis.on('error', (err) => {
            logger.error(`Blad podczas laczenia z baza danych!\n${err}`);
            process.exit(1);
        });

        // Wyswietlenie informacji o zalogowaniu sie bota
        logger.success(`${client.user.tag} zalogowal sie!`);

        // Sprawdzenie czy tryb developera jest wlaczony
        if (process.env.DEV_MODE === 'true') return logger.debug(`Running in Dev Mode!`);
    }
};