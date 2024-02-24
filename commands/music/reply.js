'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const { embeds } = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [embeds.voice_error] });

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.channel.send({ embeds: [embeds.queue_error] });

    const res = await client.player.search(queue.currentTrack.url, {
        requestedBy: message.member
    });

    queue.insertTrack(res.tracks[0], 0);
    return message.channel.send({ embeds: [createEmbed({ description: `✅ **${res.tracks[0].title}** dodano do playlisty!` })] });
};

exports.info = {
    name: "reply",
    dj: true
};