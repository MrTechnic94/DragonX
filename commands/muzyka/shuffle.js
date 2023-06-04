'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    try {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [embeds.voice_error] });

        const queue = client.player.nodes.get(message.guild.id);

        if (!queue?.isPlaying() || queue.getSize() < 3) return message.channel.send({ embeds: [embeds.queue_error] });

        queue.tracks.shuffle();
        return message.channel.send({ embeds: [createEmbed({ description: `🔀 **Playlista została przetasowana!**` })] });
    } catch {
        return message.channel.send({ embeds: [embeds.catch_error] })
    };
};

exports.info = {
    name: "shuffle",
    aliases: ["sh"],
    dj: true
};
