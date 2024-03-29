'use strict';

const guildSettings = require('../../utils/guildSettings.js');
const { logger } = require('../../utils/consoleLogger.js');
const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildDelete,
    run: async (_client, guild) => {
        try {
            const existingGuild = await guildSettings.findOneAndDelete({ guildId: guild.id });
            if (existingGuild) logger.info(`Usunieto wpis z bazy danych dla: ${guild.name}`);
        } catch (err) {
            logger.error(`Blad podczas usuwania wpisu z bazy danych dla: ${guild.name}\n${err}`);
        }
    }
};