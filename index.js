'use strict';

const { Client, Collection, GatewayIntentBits, Partials, ActivityType, PresenceUpdateStatus } = require('discord.js');
const { Player } = require('discord-player');
const { errorCatcher } = require('./utils/errorCatcher.js');
require('dotenv').config();

// Zaladowanie errorCatcher, ktory pozwala przechwycic bledy
errorCatcher();

// Inicjalizacja klienta bota z określonymi ustawieniami
const client = new Client({
	allowedMentions: {
		parse: ['users', 'roles'],
		repliedUser: true
	},
	restRequestTimeout: 60000,
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
		filter: process.env.AUDIO_FILTER,
		highWaterMark: 1 << 25
	}
});

// Zalodowanie infrastruktury bota
['commands', 'aliases'].forEach(x => (client[x] = new Collection()));

['./structures/commands.js', './structures/events.js', './structures/events-music.js'].forEach(x => require(x)(client));

// Zalogowanie bota do discorda
if (process.env.DEV_MODE === 'true') {
	client.login(process.env.TOKEN_DEV);
} else {
	client.login(process.env.TOKEN);
};