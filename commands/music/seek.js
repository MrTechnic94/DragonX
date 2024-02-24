'use strict';

const { parseTime } = require('../../utils/parseTime.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const { embeds } = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
  if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [embeds.voice_error] });

  const queue = client.player.nodes.get(message.guild.id);

  if (!queue?.isPlaying()) return message.channel.send({ embeds: [embeds.queue_error] });

  const seekTime = parseTime(args[0]);
  
  if (seekTime === null || seekTime >= queue.currentTrack.durationMS || queue.currentTrack.durationMS <= seekTime || seekTime === queue.currentTrack.durationMS) return message.channel.send({ embeds: [embeds.time_seek_error] });

  const durationSeconds = Math.round(seekTime / 1000);

  if (durationSeconds <= 0) return message.channel.send({ embeds: [embeds.number_error] });

  queue.node.seek(durationSeconds * 1000);
  return message.channel.send({ embeds: [createEmbed({ description: `🎵 **Ustawiono odtwarzanie na: ${args[0]}!**` })] });
};

exports.info = {
  name: "seek",
  dj: true
};