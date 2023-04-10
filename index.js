'use strict';

const { Client, Collection, Intents } = require('discord.js');
const { Player } = require('discord-player');
const clc = require('cli-color');
require('discord-player/smoothVolume');
require('dotenv').config();

const client = new Client({
intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_VOICE_STATES
],
partials: [
	"CHANNEL",
	"MESSAGE",
	"GUILD_MEMBER"
],
	disableMentions: "everyone"
});

client.once('ready', () => {
	console.log(('[') + clc.redBright('Bot') + (']') + clc.redBright(` ${client.user.tag} zalogowal sie!`))
});

// -----> Zaladowanie discord-player <-----
const player = new Player(client);

client.player = player;

// -----> Zalodowanie Handlera <-----
["commands", "aliases"].forEach(x => (client[x] = new Collection()));

["./handler/events.js",  "./handler/events-music.js", "./handler/commands.js"].forEach(x => require(x)(client));

// -----> Errory <-----
client.on('unhandledRejection', error => {
	console.error((`[`) + clc.redBright(`Error`) + (`] `) + error);
});

// -----> Zalogowanie Bota do Discorda <-----
client.login(process.env.TOKEN);