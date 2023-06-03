'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    try {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [embeds.voice_error] });

        const queue = client.player.nodes.get(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [embeds.queue_error] });

        if (queue.node.isPaused()) return message.channel.send({ embeds: [embeds.paused_error] });

        queue.node.pause();
        return message.channel.send({ embeds: [createEmbed({ description: `🔇 **Zatrzymano odtwarzanie piosenki!**` })] });
    } catch {
        return message.channel.send({ embeds: [embeds.catch_error] })
    };
};

exports.info = {
    name: "pause",
    aliases: ["pa"],
    dj: true
};