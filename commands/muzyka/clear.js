'use strict';

const { EmbedBuilder } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    if (!queue.tracks.at(0)) return message.reply({embeds: [embeds.track_clear_error]});

    await queue.tracks.clear();
    return message.reply({embeds: [new EmbedBuilder().setDescription(`💨 **Playlista została wyczyszczona!**`).setColor('Red')]});
};

exports.info = {
    name: "clear",
    aliases: ['c'],
    dj: true
};