'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue) return message.reply({embeds: [embeds.queue_error]});

    const mode = queue.filters.ffmpeg.isEnabled('compressor') ? `wyłączony` : `włączony`;
    await queue.filters.ffmpeg.toggle(['compressor', 'normalizer']);

    return message.reply({embeds: [createEmbed({description: `🎵 **Compressor został ${mode}!**`})]});
};

exports.info = {
    name: "compressor",
    aliases: ["cm"],
    dj: true
};