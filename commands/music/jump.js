'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');
const { useQueue } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'jump',
    aliases: ['j', 'skipto'],
    dj: true,
    cooldown: 2,
    run: async (_client, message, args) => {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        const index = parseInt(args[0]);
        const track = queue.tracks.at(index - 1);

        if (!index || !track || index < 0) return message.channel.send({ embeds: [messageEmbeds.number_error] });

        queue.node.jump(track);
        return message.channel.send({ embeds: [createEmbed({ description: `⏩ **Przeskoczono do \`${track.title}\`**` })] });
    }
};