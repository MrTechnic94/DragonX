'use strict';

const { Client, Collection, GatewayIntentBits, Partials, ActivityType, PresenceUpdateStatus } = require('discord.js');
const { Player } = require('discord-player');
const { logger } = require('./utils/consoleLogs.js');
require('dotenv').config();

const client = new Client({
	messageEditHistoryMaxSize: process.env.MESSAGE_EDIT_HISTORY_MAXSIZE,
	messageCacheMaxSize: process.env.MESSAGE_CACHE_MAX_SIZE,
	messageSweepInterval: process.env.MESSAGE_SWEEP_INTERVAL,
	messageCacheLifetime: process.env.MESSAGE_CACHE_LIFETIME,
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent
	],
	partials: [
		Partials.Channel,
		Partials.Message,
		Partials.GuildMember
	],
	presence: {
		status: PresenceUpdateStatus.Online,
		activities: [{
			name: process.env.STATUS_NAME,
			type: ActivityType.Listening
		}]
	}
});

// Zaladowanie discord-player
client.player = new Player(client, {
	useLegacyFFmpeg: process.env.USE_LEGACY_FFMPEG,
	skipFFmpeg: process.env.SKIP_FFMPEG,
	ytdlOptions: {
		quality: process.env.AUDIO_QUALITY,
		highWaterMark: 1 << 25
	}
});

// Zalodowanie infrastruktury bota
['commands', 'aliases'].forEach(x => (client[x] = new Collection()));

['./structures/commands.js', './structures/events.js', './structures/events-music.js'].forEach(x => require(x)(client));

// Zaladowanie procesow do przechwytywania bledow
process.on('unhandledRejection', err => {
	logger.error(err);
});

process.on('uncaughtException', err => {
	logger.error(err);
});

// Zalogowanie bota do discorda
client.login(process.env.TOKEN);