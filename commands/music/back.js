'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const { embeds } = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [embeds.voice_error] });

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.channel.send({ embeds: [embeds.queue_error] });

    if (!queue.history.previousTrack) return message.channel.send({ embeds: [embeds.track_back_error] });

    await queue.history.back();
    return message.channel.send({ embeds: [createEmbed({ description: `◀️ **Odtwarzam poprzednią piosenkę!**` })] });
};

exports.info = {
    name: "back",
    aliases: ["b", "previous", "prev"],
    dj: true
};