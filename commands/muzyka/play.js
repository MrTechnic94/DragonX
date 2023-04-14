'use strict';

const { EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

exports.run = async (client, message, args) => {

    const res = await client.player.search(args.join(' '), {
        requestedBy: message.member,
        searchEngine: QueryType.AUTO
    });

    if (!res || !res.tracks.length) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie znaleziono takiej piosenki!**`).setColor("Red")]});

    if (!message.member?.voice.channelId) return await message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na kanale głosowym!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return await message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    const queue = await client.player.createQueue(message.guild, {
        leaveOnStop: true,
	    leaveOnEnd: true,
	    leaveOnEmpty: true,
        ytdlOptions: {
            quality: 'highestaudio',
            filter: 'audioonly',
            highWaterMark: 1 << 30,
            dlChunkSize: 0,
        },
    metadata: {
        channel: message.channel
    }
});

    try {
        if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
        await client.player.deleteQueue(message.guild.id);
        return await message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Musisz być na tym samym kanale co bot!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("Red")]});
    };

    await message.channel.send(`🔎 **Proszę czekać wyszukuję...**`).then(async m => {

    await res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    if (!queue.playing) await queue.play();
    m.delete();
});

};

exports.info = {
    name: "play",
    aliases: ['sr', 'songrequest', 'p']
}