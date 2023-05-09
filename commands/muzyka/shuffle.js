'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue || !queue.tracks.at(0)) return message.channel.send({embeds: [embeds.queue_error]});

    queue.tracks.shuffle();
    return message.channel.send({embeds: [createEmbed({description: `🔀 **Playlista została przetasowana!**`})]});
};

exports.info = {
    name: "shuffle",
    aliases: ["sh"],
    dj: true
};