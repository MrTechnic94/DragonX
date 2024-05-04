/**
 * Ten kod został stworzony z pasji przez MrTechnic.
 * Pierwotnie był wykorzystywany przez bota DragonX,
 * ale teraz udostępniam go dla wszystkich jako projekt open-source.
 * Jest łatwy w konfiguracji, prosty w obsłudze i posiada przejrzysty interfejs.
 * Kod ten umożliwia tworzenie i obsługę różnych funkcji bota Discord,
 * takich jak obsługa komend muzycznych, zarządzanie cooldownami, czy lekka konstrukcja bota.
 * Zachęcam do wykorzystania tego kodu w swoim projekcie,
 * a także do zgłaszania błędów i sugestii na GitHubie.
 * 
 * Znajdziesz mnie i moje projekty tutaj: https://github.com/MrTechnic94/
*/

'use strict';

const config = require('./config/default');
const logger = require('./utils/consoleLogger');
const { errorCatcher } = require('./utils/errorCatcher');
const { Client, Collection } = require('discord.js');
const { Player } = require('discord-player');
const { default: DeezerExtractor } = require('discord-player-deezer');
require('dotenv').config({ path: './config/.env' });

// Zaladowanie errorCatcher, ktory pozwala przechwycic bledy
errorCatcher();

// Inicjalizacja klienta bota z określonymi ustawieniami
const client = new Client({
	// restRequestTimeout: config.restRequestTimeout,
	// messageEditHistoryMaxSize: config.messageEditHistoryMaxSize,
	// messageCacheMaxSize: config.messageCacheMaxSize,
	// messageSweepInterval: config.messageSweepInterval,
	// messageCacheLifetime: config.messageCacheLifetime,
	// intents: config.intents,
	// makeCache: config.makeCache,
	// sweepers: config.sweepers,
	// // partials: config.partials,
	// presence: config.presence,
	// allowedMentions: config.allowedMentions
	...config.clientOptions
});

// Zaladowanie discord-player
const player = new Player(client, {
	useLegacyFFmpeg: config.clientPlayerOptions.useLegacyFFmpeg,
	skipFFmpeg: config.clientPlayerOptions.skipFFmpeg,
	ytdlOptions: {
		quality: config.clientPlayerOptions.audioQuality,
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
		logger.info('Zaladowano wszystkie dodatki');

		// Zalogowanie bota do discord
		const token = process.env.DEV_MODE === 'true' ? process.env.TOKEN_DEV : process.env.TOKEN;

		await client.login(token);
	} catch (err) {
		logger.error(`Wystapil nieoczekiwany blad\n${err}`);
		process.exit(1);
	};
})();