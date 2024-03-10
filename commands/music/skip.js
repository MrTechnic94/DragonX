'use strict';

const { useQueue, QueueRepeatMode } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

exports.run = async (_client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

    const queue = useQueue(message.guild.id);

    if (!queue?.isPlaying() || queue.repeatMode === QueueRepeatMode.OFF && !queue.tracks.at(0)) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

    queue.votes = queue.votes || [];

    if (queue.votes.includes(message.author.id)) return message.channel.send({ embeds: [messageEmbeds.already_voted_error] });

    const required = Math.ceil((message.member.voice.channel.members.size - 1) / 2);
    const currentVotes = queue.votes.length + 1;

    queue.votes.push(message.author.id);

    if (currentVotes >= required) {
        queue.node.skip();
        queue.votes = [];
        return message.channel.send({ embeds: [messageEmbeds.skip_success] });
    };

    return message.channel.send({ embeds: [createEmbed({ description: `**Zagłosowałeś na pominięcie piosenki (${currentVotes} / ${required})**` })] });
};

exports.info = {
    name: "skip",
    aliases: ["s", "vote", "next", "n"]
};