'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [embeds.voice_error] });

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying() || queue.repeatMode === 0 && !queue.tracks.at(0)) return message.channel.send({ embeds: [embeds.queue_error] });

    queue.node.skip();
    return message.channel.send({ embeds: [createEmbed({ description: `⏩ **Pominięto aktualną piosenkę!**` })] });
};

exports.info = {
    name: "forceskip",
    aliases: ["fs"],
    dj: true
};