'use strict';

const { EmbedBuilder } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});
    
    if (!queue.node.isPaused()) return message.reply({embeds: [embeds.resumed_error]});

    await queue.node.resume();
    return message.reply({embeds: [new EmbedBuilder().setDescription(`🔊 **Wznowiono odtwarzanie piosenki!**`).setColor('Red')]});
};

exports.info = {
    name: "resume",
    aliases: ['r'],
    dj: true
};