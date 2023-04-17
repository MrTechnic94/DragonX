'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.member?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na kanale głosowym!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    const res = await client.player.search(args.join(' '), {
        requestedBy: message.member
    });

    if (!res?.hasTracks()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie znaleziono takiej piosenki!**`).setColor("Red")]});

    const m = await message.channel.send(`🔎 **Proszę czekać wyszukuję...**`);

    await client.player.play(message.member.voice.channel?.id, res, {
        nodeOptions: {
            metadata: {
                channel: message.channel
            },
            leaveOnEndCooldown: 120000,
            leaveOnStop: true,
            leaveOnEmpty: true,
            skipOnNoStream: true,
            ytdlOptions: {
                filters: 'audioonly',
                quality: 'highestaudio'
            }
        }
    });
    m.delete();
};

exports.info = {
    name: "play",
    aliases: ['p', 'songrequest', 'sr'],
    dj: true
};
