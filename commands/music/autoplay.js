'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');
const { useQueue, QueueRepeatMode } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
  name: 'autoplay',
  aliases: ['ap'],
  dj: true,
  run: async (_client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

    const queue = useQueue(message.guild.id);

    if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

    queue.setRepeatMode(queue.repeatMode === QueueRepeatMode.AUTOPLAY ? QueueRepeatMode.OFF : QueueRepeatMode.AUTOPLAY);

    const mode = queue.repeatMode === QueueRepeatMode.AUTOPLAY ? 'włączony' : 'wyłączony';

    return message.channel.send({ embeds: [createEmbed({ description: `🎵 **Autoplay został \`${mode}\`!**` })] });
  }
};