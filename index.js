const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const dotenv = require('dotenv');
require('dotenv').config();
const { Player } = require('discord-player');

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
	disableMentions: 'everyone'
});

client.on('ready', () => {});

const player = new Player(client);

client.player = player;

["commands", "aliases"].forEach(x => (client[x] = new Collection()));

["./handler/events.js",  "./handler/events-music.js", "./handler/commands.js",].forEach(x => require(x)(client));

client.on('shardError', error => {
	console.error('❗ Polaczenie websocket napotkalo blad', error);
});

client.on('unhandledRejection', error => {
	console.error('❗ Nieobslugiwany blad', error);
});

client.login(process.env.TOKEN);
