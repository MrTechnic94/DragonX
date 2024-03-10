'use strict';

const { useQueue } = require('discord-player');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

exports.run = async (_client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

    const queue = useQueue(message.guild.id);

    if (!queue.history.previousTrack) return message.channel.send({ embeds: [messageEmbeds.track_back_error] });

    await queue.history.back();
    return message.channel.send({ embeds: [messageEmbeds.track_back_success] });
};

exports.info = {
    name: "back",
    aliases: ["b", "previous", "prev"],
    dj: true
};