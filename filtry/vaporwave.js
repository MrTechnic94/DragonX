'use strict';

const { EmbedBuilder } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    const queue = client.player.nodes.get(message.guild.id);
    
    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const mode = queue.filters.ffmpeg.isEnabled('vaporwave') ? `wyłączony` : `włączony`;
    await queue.filters.ffmpeg.toggle(['vaporwave', 'normalizer']);

    return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Vaporwave został ${mode}!**`).setColor('Red')]});
};

exports.info = {
    name: "vaporwave",
    aliases: ["vap"],
    dj: true
};