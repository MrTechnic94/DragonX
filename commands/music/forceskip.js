'use strict';

const { QueueRepeatMode } = require('discord-player');
const { embeds } = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [embeds.voice_error] });

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying() || queue.repeatMode === QueueRepeatMode.OFF && !queue.tracks.at(0)) return message.channel.send({ embeds: [embeds.queue_error] });

    queue.node.skip();
    return message.channel.send({ embeds: [embeds.force_skip_success] });
};

exports.info = {
    name: "forceskip",
    aliases: ["fs"],
    dj: true
};