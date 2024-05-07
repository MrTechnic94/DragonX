/*
 * Ten kod został stworzony z pasji przez MrTechnic.
 * Pierwotnie był wykorzystywany przez bota DragonX,
 * ale teraz udostępniam go dla wszystkich jako projekt open-source.
 * Jest łatwy w konfiguracji, prosty w obsłudze i posiada przejrzysty interfejs.
 * Kod ten posiada wszystkie funkcje bota DragonX,
 * takich jak obsługa komend muzycznych, zarządzanie cooldownami, czy lekka konstrukcja bota.
 * Zachęcam do wykorzystania tego kodu w swoim projekcie,
 * a także do zgłaszania błędów i sugestii na GitHubie.
 *
 * Znajdziesz mnie i moje projekty tutaj: https://github.com/MrTechnic94/
*/

'use strict';

const logger = require('./utils/consoleLogger');
const { clientOptions, playerOptions } = require('./config/default');
const { errorCatcher } = require('./utils/errorCatcher');
const { Client, Collection } = require('discord.js');
const { Player } = require('discord-player');
const { default: DeezerExtractor } = require('discord-player-deezer');
require('dotenv').config({ path: './config/.env' });

// Pozwala przechwycic bledy oraz sprawdzic obecnosc wymaganych parametrow
errorCatcher();

// Inicjalizacja klienta bota z określonymi ustawieniami
const client = new Client({
	...clientOptions
});

// Zaladowanie discord-player
const player = new Player(client, {
	useLegacyFFmpeg: playerOptions.useLegacyFFmpeg,
	skipFFmpeg: playerOptions.skipFFmpeg,
	ytdlOptions: {
		quality: playerOptions.audioQuality,
		highWaterMark: 1 << 25
	}
});

// Zalodowanie handlerow komend i eventow
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