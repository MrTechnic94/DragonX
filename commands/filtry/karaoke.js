'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue) return message.channel.send({embeds: [embeds.queue_error]});

    const mode = queue.filters.ffmpeg.isEnabled('karaoke') ? `wyłączony` : `włączony`;
    queue.filters.ffmpeg.toggle(['karaoke', 'normalizer']);

    return message.channel.send({embeds: [createEmbed({description: `🎵 **Karaoke został ${mode}!**`})]});
};

exports.info = {
    name: "karaoke",
    aliases: ['ka'],
    dj: true
};