'use strict';

const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { Player } = require('discord-player');
const DeezerExtractor = require('discord-player-deezer').default;
require('dotenv').config();

const client = new Client({
	messageEditHistoryMaxSize: 0,
	messageCacheMaxSize: 100,
	messageSweepInterval: 7200,
	messageCacheLifetime: 86400,
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
	]
});

// Zaladowanie discord-player
client.player = new Player(client, {
	leaveOnEndCooldown: 240000,
	leaveOnStop: true,
	leaveOnEmpty: true,
	skipOnNoStream: true,
	ytdlOptions: {
		filters: 'audioonly',
		quality: 'highestaudio'
	}
});

client.player.extractors.loadDefault();

client.player.extractors.register(DeezerExtractor);

// Zalodowanie infrastruktury bota
['commands', 'aliases'].forEach(x => (client[x] = new Collection()));

['./structures/events.js', './structures/events-music.js', './structures/commands.js'].forEach(x => require(x)(client));

// Zalogowanie bota do discorda
client.login(process.env.TOKEN);
