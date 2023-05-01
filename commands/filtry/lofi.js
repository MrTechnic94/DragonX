'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue) return message.reply({embeds: [embeds.queue_error]});

    const mode = queue.filters.ffmpeg.isEnabled('lofi') ? `wyłączony` : `włączony`;
    await queue.filters.ffmpeg.toggle(['lofi', 'normalizer']);

    return message.reply({embeds: [createEmbed({description: `🎵 **Lofi został ${mode}!**`})]});
};

exports.info = {
    name: "lofi",
    aliases: ["lf"],
    dj: true
};