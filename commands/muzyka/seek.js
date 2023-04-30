'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message, args) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);
    const seekTime = parseInt(args[0]);

    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    if (seekTime * 1000 >= queue.currentTrack.durationMS) return message.reply({embeds: [embeds.time_seek_error]});

    if (!seekTime || seekTime <= 0) return message.reply({embeds: [embeds.number_error]});

    await queue.node.seek(seekTime * 1000);
    return message.reply({embeds: [createEmbed({description: `🎵 **Ustawiono odtwarzanie na: ${queue.node.getTimestamp().current.label}!**`})]});
};

exports.info = {
    name: "seek",
    aliases: ["sk"],
    dj: true
};
