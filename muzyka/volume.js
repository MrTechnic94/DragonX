'use strict';

const { EmbedBuilder } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    const queue = client.player.nodes.get(message.guild.id);
    const vol = parseInt(args[0]);

    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    if (vol < 0 || vol > 200) return message.reply({embeds: [embeds.max_volume_error]});

    if (!vol) return message.reply({embeds: [embeds.number_error]})
  
    if (queue.node.volume === vol) return message.reply({embeds: [embeds.already_volume_error]});

    await queue.node.setVolume(vol);
    return message.reply({embeds: [new EmbedBuilder().setDescription(`🔊 **Ustawiono głośność na: ${vol}%**`).setColor('Red')]});
};

exports.info = {
    name: "volume",
    aliases: ['v'],
    dj: true
};