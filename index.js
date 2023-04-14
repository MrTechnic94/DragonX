const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const dotenv = require('dotenv');
require('dotenv').config();
const { Player } = require('discord-player');
const clc = require('cli-color');

const client = new Client({ 
intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_VOICE_STATES
],
partials: [
	"CHANNEL",
	"MESSAGE",
	"GUILD_MEMBER"
],
	disableMentions: 'everyone'
});

client.on('ready', () => {});

// -----> Zaladowanie discord-player <-----
const player = new Player(client);

client.player = player;

// -----> Zalodowanie Handlera <-----
["commands", "aliases"].forEach(x => (client[x] = new Collection()));

["./handler/events.js",  "./handler/events-music.js", "./handler/commands.js"].forEach(x => require(x)(client));

// -----> Errory <-----
client.on('shardError', error => {
	console.log(clc.redBright('======> Websocket error <======'));
	console.error(clc.redBright(error));
	console.log(clc.redBright('==================================='));
});

client.on('unhandledRejection', error => {
	console.log(clc.redBright('======> Nieobslugiwany error <======'));
	console.error(clc.redBright(error));
	console.log(clc.redBright('===================================='));
});

client.login(process.env.TOKEN);