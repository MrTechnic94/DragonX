'use strict';

const { parseTime } = require('../../utils/parseTime.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
  if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [embeds.voice_error] });

  const queue = client.player.nodes.get(message.guild.id);

  if (!queue?.isPlaying()) return message.channel.send({ embeds: [embeds.queue_error] });

  const seekTime = parseTime(args[0]);
  const durationSeconds = Math.round(seekTime / 1000);

  if (seekTime === null || durationSeconds >= queue.currentTrack.duration) return message.channel.send({ embeds: [embeds.time_seek_error] });

  if (durationSeconds <= 0) return message.channel.send({ embeds: [embeds.number_error] });

  queue.node.seek(durationSeconds * 1000);
  return message.channel.send({ embeds: [createEmbed({ description: `🎵 **Ustawiono odtwarzanie na: ${queue.node.getTimestamp().current.label}!**` })] });
};

exports.info = {
  name: "seek",
  dj: true
};