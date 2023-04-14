const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const dotenv = require('dotenv');
require('dotenv').config();
const { Player } = require('discord-player');
const clc = require('cli-color');
const Cluster = require('discord-hybrid-sharding');
const bufferUtil = require('bufferutil');
const crypto = require('crypto');

const client = new Client({ 
	shards: Cluster.data.SHARD_LIST,
	shardCount: Cluster.data.TOTAL_SHARDS,
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

client.on('ready', () => {
	const Guilds = client.guilds.cache.map(guild => guild.name);
    console.log(Guilds);
});

// Zaladowanie discord-player
const player = new Player(client);

client.player = player;

const source = crypto.randomBytes(10);
const mask = crypto.randomBytes(4);

bufferUtil.mask(source, mask, source, 0, source.length);

// Zalodowanie Handlera
["commands", "aliases"].forEach(x => (client[x] = new Collection()));

["./handler/events.js",  "./handler/events-music.js", "./handler/commands.js",].forEach(x => require(x)(client));

// Errory
client.on('shardError', error => {
	console.error(clc.redBright('❗ Polaczenie websocket napotkalo blad', error));
});

client.on('unhandledRejection', error => {
	console.error(clc.redBright('❗ Nieobslugiwany blad', error));
});

// Shardowanie bota
client.cluster = new Cluster.Client(client);

client.login(process.env.TOKEN);