'use strict';

const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { Player } = require('discord-player');
// const { ClusterClient, getInfo } = require('discord-hybrid-sharding');
const DeezerExtractor = require('discord-player-deezer').default;
require('dotenv').config();

const client = new Client({
	// shards: getInfo().SHARD_LIST,
    // shardCount: getInfo().TOTAL_SHARDS,
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

// -----> Zaladowanie discord-hybrid-sharding <-----
// client.cluster = new ClusterClient(client);

// -----> Zalodowanie infrastruktury bota <-----
['commands', 'aliases'].forEach(x => (client[x] = new Collection()));

['./structures/events.js', './structures/events-music.js', './structures/commands.js'].forEach(x => require(x)(client));

// -----> Zalogowanie bota do discorda <-----
client.login(process.env.TOKEN);