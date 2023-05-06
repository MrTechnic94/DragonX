'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue) return message.channel.send({embeds: [embeds.queue_error]});

    if (queue.node.isPaused()) return message.channel.send({embeds: [embeds.paused_error]});

    await queue.node.pause();
    return message.channel.send({embeds: [createEmbed({description: `🔇 **Zatrzymano odtwarzanie piosenki!**`})]});
};

exports.info = {
    name: "pause",
    aliases: ["pa"],
    dj: true
};