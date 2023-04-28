'use strict';

const { EmbedBuilder } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    if (queue.node.isPaused()) return message.reply({embeds: [embeds.paused_error]});

    await queue.node.pause();
    return message.reply({embeds: [new EmbedBuilder().setDescription(`🔇 **Zatrzymano odtwarzanie piosenki!**`).setColor('Red')]});
};

exports.info = {
    name: "pause",
    aliases: ['pa'],
    dj: true
};