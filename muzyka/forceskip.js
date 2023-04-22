'use strict';

const { EmbedBuilder } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    const queue = client.player.nodes.get(message.guild.id);
    
    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    if (queue.repeatMode === 0 && !queue.tracks.at(0)) return message.reply({embeds: [embeds.track_queue_error]});

    await queue.node.skip();
    return message.reply({embeds: [new EmbedBuilder().setDescription(`⏩ **Pominięto aktualną piosenkę!**`).setColor('Red')]});
};

exports.info = {
    name: "forceskip",
    aliases: ['fs'],
    dj: true
};