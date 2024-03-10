'use strict';

const { useMainPlayer } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

exports.run = async (_client, message, args) => {
    if (!args[0]) return message.channel.send({ embeds: [messageEmbeds.track_error] });

    if (!message.member?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.member_voice_error] });

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

    if (message.member?.voice.channel.full && !message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.full_channel_error] });

    const player = useMainPlayer();

    const res = await player.search(args.join(' '), {
        requestedBy: message.member
    });

    if (!res.hasTracks()) return message.channel.send({ embeds: [messageEmbeds.track_error] });

    if (res.tracks.length > process.env.MAX_QUEUE_SIZE) return message.channel.send({ embeds: [messageEmbeds.max_queue_error] });

    message.channel.send({ embeds: [createEmbed({ description: res.hasPlaylist() ? `✅ Dodano **${res.tracks.length}** utwory do playlisty!` : `✅ **${res.tracks[0].title}** dodano do playlisty!` })] });

    try {
        await player.play(message.member.voice.channel, res, {
            nodeOptions: {
                metadata: message.channel,
                leaveOnEndCooldown: process.env.LEAVE_ON_END_COOLDOWN,
                leaveOnEmptyCooldown: process.env.LEAVE_ON_EMPTY_COOLDOWN,
                leaveOnStop: process.env.LEAVE_ON_STOP,
                pauseOnEmpty: process.env.PAUSE_ON_EMPTY,
                maxQueueSize: process.env.MAX_QUEUE_SIZE,
                bufferingTimeout: process.env.BUFFERING_TIMEOUT,
                connectionTimeout: process.env.CONNECTION_TIMEOUT
            }
        });
    } catch {
        return message.channel.send({ embeds: [messageEmbeds.catch_error] });
    };
};

exports.info = {
    name: "play",
    aliases: ["p", "songrequest", "sr"],
    dj: true
};