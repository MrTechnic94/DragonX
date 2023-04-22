'use strict';

const { EmbedBuilder } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    const queue = client.player.nodes.get(message.guild.id);
    const index = args[0] - 1;
    
    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    if (!args[0] || args[0] < 1 || args[0] > queue.getSize()) return message.reply({embeds: [embeds.number_error]});

    const track = queue.tracks.at(index);

    await queue.node.remove(index);
    return message.reply({embeds: [new EmbedBuilder().setDescription(`🎯 **Usunięto: ${track.title}**!`).setColor('Red')]});
};

exports.info = {
    name: "remove",
    aliases: ['re'],
    dj: true
};