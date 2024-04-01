'use strict';

const guildSettings = require('../../utils/guildSettings.js');
const { logger } = require('../../utils/consoleLogger.js');
const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildDelete,
    run: async (_client, guild) => {
        try {
            const existingGuild = await guildSettings.findOneAndDelete({ guildId: guild.id });
            if (existingGuild) return logger.info(`Usunieto wpis z bazy danych dla: ${guild.name}`);
        } catch (err) {
            return logger.error(`Blad podczas usuwania wpisu dla: ${guild.name}`);
        }
    }
};