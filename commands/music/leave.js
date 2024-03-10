'use strict';

const { useQueue } = require('discord-player');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

exports.run = async (_client, message) => {
    if (!message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.bot_voice_error] });

    if (!message.member?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.member_voice_error] });

    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

    const queue = useQueue(message.guild.id);

    if (queue) {
        queue.delete();
    } else {
        message.guild.members.me?.voice.disconnect();
    };

    return message.channel.send({ embeds: [messageEmbeds.leave_channel_success] });
};

exports.info = {
    name: "leave",
    aliases: ["l", "disconnect", "dc"],
    dj: true
};