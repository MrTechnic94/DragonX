'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'remove',
    aliases: ['rm', 'delete', 'del'],
    dj: true,
    cooldown: 2,
    async run(_client, message, args) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        const index = parseInt(args[0]);
        const track = queue.tracks.at(index - 1);

        if (!index || !track || index < 0) return message.channel.send({ embeds: [messageEmbeds.number_error] });

        queue.node.remove(track);
        return message.channel.send({ embeds: [createEmbed({ description: `🎯 **Usunięto \`${track.title}\`**` })] });
    }
};