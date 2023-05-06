'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const { parseTime } = require('../../utils/parseTime.js');

exports.run = async (client, message, args) => {send
  if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({embeds: [embeds.voice_error]});

  const queue = client.player.nodes.get(message.guild.id);

  if (!queue) return message.channel.send({embeds: [embeds.queue_error]});

  const seekTime = parseTime(args[0]);
  if (seekTime === null) return message.channel.send({embeds: [embeds.time_seek_error]});

  const durationSeconds = Math.round(seekTime / 1000);

  if (durationSeconds >= queue.currentTrack.duration) return message.channel.send({embeds: [embeds.time_seek_error]});

  if (durationSeconds <= 0) return message.channel.send({embeds: [embeds.number_error]});

  queue.node.seek(durationSeconds * 1000);
  return message.channel.send({embeds: [createEmbed({description: `🎵 **Ustawiono odtwarzanie na: ${queue.node.getTimestamp().current.label}!**`})]});
};

exports.info = {
  name: "seek",
  aliases: ["sk"],
  dj: true
};