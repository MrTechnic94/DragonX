'use strict';

const { EmbedBuilder } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    if (queue.history.previousTracks < 1) return message.reply({embeds: [embeds.track_back_error]});

    await queue.history.back();
    return message.reply({embeds: [new EmbedBuilder().setDescription(`◀ **Odtwarzam poprzedni utwór!**`).setColor('Red')]});
};

exports.info = {
    name: "back",
    aliases: ['b'],
    dj: true
};