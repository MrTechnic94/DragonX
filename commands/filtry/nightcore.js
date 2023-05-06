'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);
    
    if (!queue) return message.channel.send({embeds: [embeds.queue_error]});

    const mode = queue.filters.ffmpeg.isEnabled('nightcore') ? `wyłączony` : `włączony`;
    queue.filters.ffmpeg.toggle(['nightcore', 'normalizer']);

    return message.channel.send({embeds: [createEmbed({description: `🎵 **Nightcore został ${mode}!**`})]});
};

exports.info = {
    name: "nightcore",
    aliases: ["nc"],
    dj: true
};