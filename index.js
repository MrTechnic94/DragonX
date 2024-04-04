'use strict';

const config = require('./config/default.js');
const logger = require('./utils/consoleLogger.js');
const { errorCatcher } = require('./utils/errorCatcher.js');
const { Client, Collection } = require('discord.js');
const { Player } = require('discord-player');
const { default: DeezerExtractor } = require('discord-player-deezer');
require('dotenv').config({ path: './config/.env' });

// Zaladowanie errorCatcher, ktory pozwala przechwycic bledy
errorCatcher();

// Inicjalizacja klienta bota z określonymi ustawieniami
const client = new Client({
	restRequestTimeout: config.restRequestTimeout,
	messageEditHistoryMaxSize: config.messageEditHistoryMaxSize,
	messageCacheMaxSize: config.messageCacheMaxSize,
	messageSweepInterval: config.messageSweepInterval,
	messageCacheLifetime: config.messageCacheLifetime,
	intents: config.intents,
	partials: config.partials,
	presence: config.presence,
	allowedMentions: config.allowedMentions
});

// Zaladowanie discord-player
const player = new Player(client, {
	useLegacyFFmpeg: config.useLegacyFFmpeg,
	skipFFmpeg: config.skipFFmpeg,
	ytdlOptions: {
		quality: config.audioQuality,
		highWaterMark: 1 << 25
	}
});

// Zalodowanie handlerow dla komend i eventow bota
['commands', 'aliases'].forEach(x => client[x] = new Collection());

['./structures/commands.js', './structures/events.js'].forEach(x => require(x)(client));

// Stworzenie funkcji asynchronicznej
(async () => {
	try {
		// Zaladowanie dodatkow dla discord-player
		await player.extractors.loadDefault();
		await player.extractors.register(DeezerExtractor);
		logger.info(`Zaladowano wszystkie dodatki!`);

		// Zalogowanie bota do discord
		const token = process.env.DEV_MODE === 'true' ? process.env.TOKEN_DEV : process.env.TOKEN;

		await client.login(token);
	} catch (err) {
		logger.error(`Wystapil nieoczekiwany blad!\n${err}`);
		process.exit(1);
	};
})();