'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { parseTime } = require('../../utils/timeFormatter');
const { createEmbed } = require('../../utils/embedCreator');
const { useTimeline } = require('discord-player');

module.exports = {
  name: 'seek',
  dj: true,
  cooldown: 2,
  async run(_client, message, args) {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

    const timeline = useTimeline(message.guild.id);

    if (!timeline?.track) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

    const seekTime = parseTime(args[0]);

    if (!seekTime || seekTime <= 0) return message.channel.send({ embeds: [messageEmbeds.number_error] });

    if (seekTime >= timeline.track.durationMS) return message.channel.send({ embeds: [messageEmbeds.time_seek_error] });

    await timeline.setPosition(seekTime);
    return message.channel.send({ embeds: [createEmbed({ description: `🎵 **Ustawiono odtwarzanie na \`${args[0]}\`**` })] });
  }
};