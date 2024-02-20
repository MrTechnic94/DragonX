'use strict';

const mongoose = require('mongoose');
const { default: DeezerExtractor } = require('discord-player-deezer');
const { logger } = require('../../utils/consoleLogger.js');

exports.run = async (client) => {
    // Zaladowanie ekstraktorow dla discord-player
    await client.player.extractors.loadDefault().catch(err => {
        logger.error(`Blad podczas ladowania dodatkow!\n${err}`);
    });

    await client.player.extractors.register(DeezerExtractor).catch(err => {
        logger.error(`Blad podczas ladowania dodatku: DeezerExtractor!\n${err}`);
    });

    // Zalogowanie do bazy danych
    await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?authSource=${process.env.DB_USER}`
    ).then(() =>
        logger.info(`Polaczono do bazy danych!`)
    ).catch(err =>
        logger.error(`Blad podczas laczenia z baza danych!\n${err}`)
    );

    // Wyswietlenie informacji o zalogowaniu sie bota w konsoli
    logger.success(`${client.user.tag} zalogowal sie!`);

    if (process.env.DEV_MODE === 'true') logger.debug('Running in Dev Mode!');
};

exports.info = {
    once: true
};