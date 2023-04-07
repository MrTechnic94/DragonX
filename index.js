'use strict';

const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { Player, useMasterPlayer } = require('discord-player');
const DeezerExtractor = require('discord-player-deezer').default;
require('dotenv').config();

const client = new Client({
	messageEditHistoryMaxSize: 0,
	messageCacheMaxSize: 25,
	messageSweepInterval: 43200,
    	messageCacheLifetime: 21600,
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
client.player = Player.singleton(client);

const player = useMasterPlayer();

player.extractors.register(DeezerExtractor);

// -----> Zalodowanie handlera <-----
["commands", "aliases"].forEach(x => (client[x] = new Collection()));

["./handler/events.js",  "./handler/events-music.js", "./handler/commands.js"].forEach(x => require(x)(client));

// -----> Zalogowanie bota do discorda <-----
client.login(process.env.TOKEN);
