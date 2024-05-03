'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue, QueueRepeatMode } = require('discord-player');

module.exports = {
  name: 'autoplay',
  aliases: ['ap'],
  dj: true,
  cooldown: 2,
  async run(_client, message) {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

    const queue = useQueue(message.guild.id);

    if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

    queue.setRepeatMode(queue.repeatMode === QueueRepeatMode.AUTOPLAY ? QueueRepeatMode.OFF : QueueRepeatMode.AUTOPLAY);

    const mode = queue.repeatMode === QueueRepeatMode.AUTOPLAY ? 'włączony' : 'wyłączony';

    return message.channel.send({ embeds: [createEmbed({ description: `🎵 **Autoplay został \`${mode}\`**` })] });
  }
};