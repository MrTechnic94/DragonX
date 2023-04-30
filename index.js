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

// -----> Zaladowanie discord-player <-----
client.player = new Player(client);

client.player.extractors.register(DeezerExtractor);

client.player.extractors.loadDefault();

// -----> Zalodowanie infrastruktury bota <-----
['commands', 'aliases'].forEach(x => (client[x] = new Collection()));

['./structures/events.js', './structures/events-music.js', './structures/commands.js'].forEach(x => require(x)(client));

// -----> Zalogowanie bota do discorda <-----
client.login(process.env.TOKEN);