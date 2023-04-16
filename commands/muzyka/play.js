'use strict';

const { EmbedBuilder } = require('discord.js');
const { useMasterPlayer } = require('discord-player');

exports.run = async (_client, message, args) => {

    if (!message.member?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na kanale głosowym!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    const player = useMasterPlayer();

    const res = await player.search(args.join(' '), {
        requestedBy: message.member
    });

    if (!res?.hasTracks()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie znaleziono takiej piosenki!**`).setColor("Red")]});

    const m = await message.channel.send(`🔎 **Proszę czekać wyszukuję...**`);

    await player.play(message.member.voice.channel?.id, res, {
        nodeOptions: {
            metadata: {
                channel: message.channel
            },
            leaveOnEndCooldown: 120000,
            leaveOnStop: true,
            leaveOnEmpty: true,
            skipOnNoStream: true
        }
    });

    m.delete();

};

exports.info = {
    name: "play",
    aliases: ['p', 'songrequest', 'sr'],
    dj: true
};