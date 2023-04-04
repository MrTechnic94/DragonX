'use strict';

const { EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

exports.run = async (client, message, args) => {

    if (!message.member?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na kanale głosowym!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    const res = await client.player.search(args.join(' '), {
        requestedBy: message.member,
        searchEngine: QueryType.AUTO
    });

    if (!res?.hasTracks()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie znaleziono takiej piosenki!**`).setColor("Red")]});

    const m = await message.channel.send(`🔎 **Proszę czekać wyszukuję...**`);

    await client.player.play(message.member.voice.channel?.id, res, {
    nodeOptions: {
        leaveOnStop: true,
        leaveOnEnd: true,
        leaveOnEmpty: true,
        skipOnNoStream: true,
        metadata: {
            channel: message.channel
            }
        }
    });

    m.delete();

};

exports.info = {
    name: "play",
    aliases: ['sr', 'songrequest', 'p']
};
