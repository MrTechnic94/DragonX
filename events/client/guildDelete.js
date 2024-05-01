'use strict';

const redis = require('../../utils/redis.js');
const logger = require('../../utils/consoleLogger.js');
const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildDelete,
    async run(_client, guild) {
        try {
            // Sprawdzenie i usuniecie wpisu z bazy danych dla danej guildi
            const existingGuild = await redis.del(guild.id);

            // Jesli guildia posiada wpis w bazie danych, zwraca informacje o usunieciu
            if (existingGuild) return logger.info(`Usunieto wpis z bazy danych dla: ${guild.name}`);
        } catch (err) {
            return logger.error(`Blad podczas usuwania wpisu dla: ${guild.name}`);
        }
    }
};