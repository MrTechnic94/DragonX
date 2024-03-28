'use strict';

const { useQueue } = require('discord-player');
const { parseTime } = require('../../utils/formatTime.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

module.exports = {
  name: 'seek',
  dj: true,
  run: async (_client, message, args) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

    const queue = useQueue(message.guild.id);

    if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

    const seekTime = parseTime(args[0]);

    if (!seekTime || seekTime <= 0) return message.channel.send({ embeds: [messageEmbeds.number_error] });

    if (seekTime >= queue.currentTrack.durationMS) return message.channel.send({ embeds: [messageEmbeds.time_seek_error] });

    queue.node.seek(seekTime);
    return message.channel.send({ embeds: [createEmbed({ description: `🎵 **Ustawiono odtwarzanie na: ${args[0]}!**` })] });
  }
};