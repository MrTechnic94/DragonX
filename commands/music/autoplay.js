'use strict';

const { useQueue, QueueRepeatMode } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

exports.run = async (_client, message) => {
  if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

  const queue = useQueue(message.guild.id);

  if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

  queue.setRepeatMode(queue.repeatMode === QueueRepeatMode.AUTOPLAY ? QueueRepeatMode.OFF : QueueRepeatMode.AUTOPLAY);
  
  const mode = queue.repeatMode === QueueRepeatMode.AUTOPLAY ? 'włączony' : 'wyłączony';

  return message.channel.send({ embeds: [createEmbed({ description: `🎵 **Autoplay został ${mode}!**` })] });
};

exports.info = {
  name: "autoplay",
  aliases: ["ap"],
  dj: true
};