'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'move',
    aliases: ['m', 'insert'],
    dj: true,
    cooldown: 2,
    async run(_client, message, args) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        const index = parseInt(args[0]);
        const indexTrack = parseInt(args[1]);
        const trackToMove = queue.tracks.at(index - 1);

        if (!index || !indexTrack || !trackToMove || index < 0 || indexTrack < 0 || index > queue.getSize() || indexTrack > queue.getSize()) return message.channel.send({ embeds: [messageEmbeds.number_error] });

        if (index === indexTrack) return message.channel.send({ embeds: [messageEmbeds.same_move_error] });

        queue.node.move(trackToMove, indexTrack - 1);
        return message.channel.send({ embeds: [createEmbed({ description: `▶️ **Przeniesiono piosenkę z pozycji \`${index}\` na \`${indexTrack}\`**` })] });
    },
};