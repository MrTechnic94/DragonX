'use strict';

const config = require('./config/default.js');
const { Client, Collection } = require('discord.js');
const { Player } = require('discord-player');
const { errorCatcher } = require('./utils/errorCatcher.js');
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
new Player(client, {
	useLegacyFFmpeg: config.useLegacyFFmpeg,
	skipFFmpeg: config.skipFFmpeg,
	ytdlOptions: {
		quality: config.audioQuality,
		highWaterMark: 1 << 25
	}
});

// Zalodowanie infrastruktury bota
['commands', 'aliases'].forEach(x => (client[x] = new Collection()));

['./structures/commands.js', './structures/events.js'].forEach(x => require(x)(client));

// Zalogowanie bota do discord
const token = process.env.DEV_MODE === 'true' ? process.env.TOKEN_DEV : process.env.TOKEN;

client.login(token);