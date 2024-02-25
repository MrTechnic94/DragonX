'use strict';

const { embeds } = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    if (!message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [embeds.bot_voice_error] });

    if (!message.member?.voice.channelId) return message.channel.send({ embeds: [embeds.member_voice_error] });

    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [embeds.voice_error] });

    const queue = client.player.nodes.get(message.guild.id);

    if (queue?.isPlaying()) {
        queue.delete();
    } else {
        message.guild.members.me?.voice.disconnect();
    };

    return message.channel.send({ embeds: [embeds.leave_channel_success] });
};

exports.info = {
    name: "leave",
    aliases: ["l", "disconnect", "dc"],
    dj: true
};