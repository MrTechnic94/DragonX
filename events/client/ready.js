'use strict';

const logger = require('../../utils/consoleLogger.js');
const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async run(client) {
        // Wyswietlenie informacji o zalogowaniu sie bota
        logger.info(`${client.user.tag} zalogowal sie`);

        // Sprawdzenie czy tryb developera jest wlaczony
        if (process.env.DEV_MODE === 'true') return logger.info('Running in Dev Mode');
    }
};