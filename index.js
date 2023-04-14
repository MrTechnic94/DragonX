'use strict'

const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');
require('dotenv').config();
const { Player } = require('discord-player');
const clc = require('cli-color');
const isValidUTF8 = require('utf-8-validate');

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

// -----> Optymalizacja <-----
const buf = Buffer.from([0xf0, 0x90, 0x80, 0x80]);

console.log(isValidUTF8(buf));

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

client.login(process.env.TOKEN);