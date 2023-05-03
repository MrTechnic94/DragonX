'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const { parseTime } = require('../../utils/parseTime.js');

exports.run = async (client, message, args) => {
  if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

  const queue = client.player.nodes.get(message.guild.id);

  if (!queue) return message.reply({embeds: [embeds.queue_error]});

  const seekTime = parseTime(args[0]);
  if (seekTime === null) return message.reply({embeds: [embeds.time_seek_error]});

  const durationSeconds = Math.round(seekTime / 1000);

  if (durationSeconds >= queue.currentTrack.duration) return message.reply({embeds: [embeds.time_seek_error]});

  if (durationSeconds <= 0) return message.reply({embeds: [embeds.number_error]});

  await queue.node.seek(durationSeconds * 1000);
  return message.reply({embeds: [createEmbed({description: `🎵 **Ustawiono odtwarzanie na: ${queue.node.getTimestamp().current.label}!**`})]});
};

exports.info = {
  name: "seek",
  aliases: ["sk"],
  dj: true
};