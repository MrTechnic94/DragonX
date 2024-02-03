'use strict';

const { logger } = require('../../utils/consoleLogs.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const { embeds } = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send({ embeds: [embeds.track_error] });

    if (!message.member?.voice.channelId) return message.channel.send({ embeds: [embeds.member_voice_error] });

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [embeds.voice_error] });

    if (message.member?.voice.channel.full && !message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [embeds.full_channel_error] });

    const res = await client.player.search(args.join(' '), {
        requestedBy: message.member
    });

    if (!res.hasTracks()) return message.channel.send({ embeds: [embeds.track_error] });

    message.channel.send({ embeds: [createEmbed({ description: res.hasPlaylist() ? `✅ Dodano **${res.tracks.length}** utwory do playlisty!` : `✅ **${res.tracks[0].title}** dodano do playlisty!` })] });

    try {
        await client.player.play(message.member.voice.channel, res, {
            nodeOptions: {
                metadata: message.channel,
                leaveOnEndCooldown: process.env.LEAVE_ON_END_COOLDOWN,
                leaveOnEmptyCooldown: process.env.LEAVE_ON_EMPTY_COOLDOWN,
                leaveOnStop: process.env.LEAVE_ON_STOP,
                pauseOnEmpty: process.env.PAUSE_ON_EMPTY,
                maxQueueSize: process.env.MAX_QUEUE_SIZE,
                bufferingTimeout: process.env.BUFFERING_TIMEOUT,
                connectionTimeout: process.env.CONNECTION_TIMEOUT,
                skipOnNoStream: process.env.SKIP_ON_NO_STREAM,
                skipFFmpeg: process.env.SKIP_FFMPEG
            }
        });
    } catch (err) {
        logger.error(err);
        return message.channel.send({ embeds: [embeds.catch_error] });
    };
};

exports.info = {
    name: "play",
    aliases: ["p", "songrequest", "sr"],
    dj: true
};