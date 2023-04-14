'use strict';

const { Client, Collection, Intents } = require('discord.js');
const { Player } = require('discord-player');
const clc = require('cli-color');
require('dotenv').config();

const client = new Client({
intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_VOICE_STATES,
	Intents.FLAGS.GUILD_PRESENCES
],
partials: [
	"CHANNEL",
	"MESSAGE",
	"GUILD_MEMBER"
],
	disableMentions: 'everyone'
});

client.on('ready', () => {
	console.log(clc.cyanBright(`${client.user.tag} zostal zalogowany!`));
});

// -----> Zaladowanie discord-player <-----
const player = new Player(client);

client.player = player;

// -----> Zalodowanie Handlera <-----
["commands", "aliases"].forEach(x => (client[x] = new Collection()));

["./handler/events.js",  "./handler/events-music.js", "./handler/commands.js"].forEach(x => require(x)(client));

// -----> Errory <-----
client.on('shardError', error => {
	console.error((`[`) + clc.redBright(`Error`) + (`]`) + error);
});

client.on('unhandledRejection', error => {
	console.error((`[`) + clc.redBright(`Error`) + (`]`) + error);
});

// -----> Zalogowanie Bota do Discorda <-----
client.login(process.env.TOKEN);