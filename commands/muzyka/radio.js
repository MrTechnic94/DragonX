'use strict';

const { MessageEmbed } = require('discord.js');
const { Player, QueryType} = require('discord-player');
const { getVoiceConnection } = require('@discordjs/voice');

exports.run = async (client, message, args) => {

    const player = client.player

    const res = await client.player.search(args.join(' '), {
        requestedBy: message.member,
        searchEngine: QueryType.AUTO
    });

    if (!res || !res.tracks.length) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Nie znaleziono takiej piosenki!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    const queue = await client.player.createQueue(message.guild, {
        metadata: message.channel,
        leaveOnStop: true,
	    leaveOnEnd: true,
	    leaveOnEmpty: false,
	ytdlOptions: {
		quality: 'hight',
		filter: 'audioonly',
		highWaterMark: 1 << 25,
		dlChunkSize: 0
	}
});

    try {
        if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
        await client.player.deleteQueue(message.guild.id);
        return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Musisz być na tym samym kanale co bot!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});
    }
    
    await message.channel.send(`🔎 **Proszę czekać wyszukuję...**`).then(async m => {

    await res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    if (!queue.playing) await queue.play();
    m.delete()

    })
};

exports.info = {
    name: "radio",
}