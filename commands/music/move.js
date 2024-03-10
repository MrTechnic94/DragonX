'use strict';

const { useQueue } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

exports.run = async (_client, message, args) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

    const queue = useQueue(message.guild.id);

    if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

    const index = parseInt(args[0]);
    const indexTrack = parseInt(args[1]);
    const trackToMove = queue.tracks.at(index - 1);

    if (!index || !indexTrack || !trackToMove || index < 0 || indexTrack < 0 || index > queue.getSize() || indexTrack > queue.getSize()) return message.channel.send({ embeds: [messageEmbeds.number_error] });

    if (index === indexTrack) return message.channel.send({ embeds: [messageEmbeds.same_move_error] });

    queue.node.move(trackToMove, indexTrack - 1);
    return message.channel.send({ embeds: [createEmbed({ description: `▶️ **Przeniesiono piosenkę z pozycji ${index} na ${indexTrack}!**` })] });
};

exports.info = {
    name: "move",
    aliases: ["m", "insert"],
    dj: true
};