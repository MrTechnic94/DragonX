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

/* 
Token 1 = ODQxMzU4NjEzOTk3NjgyNjg5.YJlmRQ.Jhw-pMY2fRy10p18CPvnK0mhFm4
Token 2 = OTQyNzcwMTg4NDQ3NzgwOTA0.YgpVKA.4Rd-d9DeZcrvB438RXakxSRJ_ew

Legenda
Token 1 - DragonX Music
Token 2 - DragonX Music ATC
*/