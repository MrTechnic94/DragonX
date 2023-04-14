'use strict';

const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { Player } = require('discord-player');
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

client.once('ready', () => {
	console.log(('[') + "\x1b[31m" + ('Bot') + "\x1b[0m" + (']') + "\x1b[31m" + (` ${client.user.tag} zalogowal sie!`) + "\x1b[0m");
});

// -----> Zaladowanie discord-player <-----
const player = new Player(client);

client.player = player;

// -----> Zalodowanie handlera <-----
["commands", "aliases"].forEach(x => (client[x] = new Collection()));

["./handler/events.js",  "./handler/events-music.js", "./handler/commands.js"].forEach(x => require(x)(client));

// -----> Zalogowanie bota do discorda <-----
client.login(process.env.TOKEN);