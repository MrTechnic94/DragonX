'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue) return message.reply({embeds: [embeds.queue_error]});

    const mode = queue.filters.ffmpeg.isEnabled('bassboost_high') ? `wyłączony` : `włączony`;
    await queue.filters.ffmpeg.toggle(['bassboost_high', 'normalizer']);

    return message.reply({embeds: [createEmbed({description: `🎵 **Wysoki Bassboost został ${mode}!**`})]});
};

exports.info = {
    name: "bassboosthigh",
    aliases: ["bbh"],
    dj: true
};