'use strict';

const logger = require('../../utils/consoleLogger');
const { useMainPlayer } = require('discord-player');
const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async run(client) {
        // Wyswietlenie informacji o zalogowaniu sie bota
        logger.info(`${client.user.tag} zalogowal sie`);

        // Jesli tryb developera jest wlaczony, generuje raport zaleznosci uzywanych przez modul discord-voip
        if (process.env.DEV_MODE === 'true') {
            const player = useMainPlayer();
            logger.info(`Running in Dev Mode\n${player.scanDeps()}`);
        }
    }
};