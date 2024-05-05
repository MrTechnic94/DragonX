'use strict';

const logger = require('../../utils/consoleLogger');
const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async run(client) {
        // Wyswietlenie informacji o zalogowaniu sie bota
        logger.info(`${client.user.tag} zalogowal sie`);

        // Sprawdzenie czy tryb developera jest wlaczony
        if (process.env.DEV_MODE === 'true') logger.info('Running in Dev Mode');
    }
};