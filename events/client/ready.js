'use strict';

const mongoose = require('mongoose');
const { logger } = require('../../utils/consoleLogger.js');
const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    run: async (client) => {
        // Zalogowanie do bazy danych
        await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?authSource=${process.env.DB_USER}`)
            .then(() => {
                logger.info(`Polaczono do bazy danych!`)
            }).catch(err => {
                logger.error(`Blad podczas laczenia do bazy danych!\n${err}`)
                process.exit(1);
            });

        // Wyswietlenie informacji o zalogowaniu sie bota
        logger.success(`${client.user.tag} zalogowal sie!`);

        // Sprawdzenie czy tryb developera jest wlaczony
        if (process.env.DEV_MODE === 'true') logger.debug(`Running in Dev Mode!`);
    }
};