'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    const mode = queue.filters.ffmpeg.isEnabled('bassboost_low') ? `wyłączony` : `włączony`;
    await queue.filters.ffmpeg.toggle(['bassboost_low', 'normalizer']);

    return message.reply({embeds: [createEmbed({description: `🎵 **Niski Bassboost został ${mode}!**`})]});
};

exports.info = {
    name: "bassboostlow",
    aliases: ["bbl"],
    dj: true
};