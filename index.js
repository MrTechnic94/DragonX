'use strict';

const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const dotenv = require('dotenv');
require('dotenv').config();
const { Player } = require('discord-player');
const clc = require('cli-color');
const bufferUtil = require('bufferutil');
const crypto = require('crypto');

const client = new Client({ 
intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_VOICE_STATES
], 
partials:[
	"CHANNEL",
	"MESSAGE",
	"GUILD_MEMBER"
], 
	disableMentions: 'everyone',
});

client.on('ready', () => {});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
  
	if (interaction.commandName === 'ping') {
	  await interaction.reply('Pong!');
	}
  });

// Zaladowanie discord-player
const player = new Player(client);

client.player = player;

// Zalodowanie Handlera
["commands", "aliases"].forEach(x => (client[x] = new Collection()));

["./handler/events.js",  "./handler/events-music.js", "./handler/commands.js"].forEach(x => require(x)(client));

// Errory
client.on('shardError', error => {
	console.error(clc.redBright('❗ Polaczenie websocket napotkalo blad', error));
});

client.on('unhandledRejection', error => {
	console.error(clc.redBright('❗ Nieobslugiwany blad', error));
});

client.login(process.env.TOKEN);