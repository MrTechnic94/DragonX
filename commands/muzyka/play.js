'use strict';

const { EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

exports.run = async (client, message, args) => {

    const res = await client.player.search(args.join(' '), {
        requestedBy: message.member,
        searchEngine: QueryType.AUTO
    });

    if (!res || !res.hasTracks()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie znaleziono takiej piosenki!**`).setColor("Red")]});

    if (!message.member?.voice.channelId) return await message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na kanale głosowym!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return await message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    const queue = await client.player.nodes.create(message.guild, {
        leaveOnStop: true,
        leaveOnEnd: true,
        leaveOnEmpty: true,
        skipOnNoStream: true,
        selfDeaf: true,
        ytdlOptions: {
            quality: 'highestaudio',
            filter: 'audioonly',
            highWaterMark: 1 << 25,
            dlChunkSize: 0
        },
        metadata: {
            channel: message.channel
        }
    });

    try {
        if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
        await queue.delete();
        return await message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Musisz być na tym samym kanale co bot!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("Red")]});
    };

    await message.channel.send(`🔎 **Proszę czekać wyszukuję...**`).then(async m => {

    await queue.addTrack(res.playlist ? res.tracks : res.tracks[0]);

    if (!queue.node.isPlaying()) await queue.node.play();
    m.delete();
});

};

exports.info = {
    name: "play",
    aliases: ['sr', 'songrequest', 'p']
}