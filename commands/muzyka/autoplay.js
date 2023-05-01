'use strict';

const embeds = require('../../utils/embeds.js');
const { QueueRepeatMode } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
  if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

  const queue = client.player.nodes.get(message.guild.id);

  if (!queue) return message.reply({embeds: [embeds.queue_error]});

  await queue.setRepeatMode(queue.repeatMode === QueueRepeatMode.AUTOPLAY ? QueueRepeatMode.OFF : QueueRepeatMode.AUTOPLAY);
  const mode = queue.repeatMode === QueueRepeatMode.AUTOPLAY ? 'włączony' : 'wyłączony';
  
  return message.reply({embeds: [createEmbed({description: `🎵 **Autoplay został ${mode}!**`})]});
};

exports.info = {
  name: "autoplay",
  aliases: ["ap"],
  dj: true
};