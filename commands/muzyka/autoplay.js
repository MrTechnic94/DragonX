'use strict';

const { EmbedBuilder } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
  const queue = client.player.nodes.get(message.guild.id);

  if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

  if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

  await queue.setRepeatMode(queue.repeatMode === QueueRepeatMode.AUTOPLAY ? QueueRepeatMode.OFF : QueueRepeatMode.AUTOPLAY);
  const mode = queue.repeatMode === QueueRepeatMode.AUTOPLAY ? 'włączony' : 'wyłączony';
  
  return message.reply({embeds: [new EmbedBuilder().setDescription(`▶️ **Autoplay został ${mode}!**`).setColor('Red')]});
};

exports.info = {
  name: "autoplay",
  aliases: ['ap'],
  dj: true
};