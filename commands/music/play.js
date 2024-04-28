'use strict';

const config = require('../../config/default.js');
const messageEmbeds = require('../../utils/messageEmbeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
    name: 'play',
    aliases: ['p', 'songrequest', 'sr'],
    dj: true,
    cooldown: 2,
    run: async (_client, message, args) => {
        if (!args[0]) return message.channel.send({ embeds: [messageEmbeds.track_error] });

        if (!message.member?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.member_voice_error] });

        if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        if (message.member?.voice.channel.full && !message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.full_channel_error] });

        if (message.guild.members.me?.voice.mute) return message.channel.send({ embeds: [messageEmbeds.muted_bot_error] });

        const player = useMainPlayer();

        const result = await player.search(args.join(' '), {
            requestedBy: message.member
        });

        if (!result.hasTracks()) return message.channel.send({ embeds: [messageEmbeds.track_error] });

        try {
            message.channel.send({ embeds: [createEmbed({ description: result.hasPlaylist() ? `✅ **Dodano \`${result.tracks.length}\` utwory z \`${result.playlist.title}\`!**` : `✅ **Dodano \`${result.tracks[0].title}\` do playlisty!**` })] });

            await player.play(message.member.voice.channel, result, {
                nodeOptions: {
                    metadata: message.channel,
                    leaveOnEndCooldown: config.leaveOnEndCooldown,
                    leaveOnEmptyCooldown: config.leaveOnEmptyCooldown,
                    leaveOnStop: config.leaveOnStop,
                    pauseOnEmpty: config.pauseOnEmpty,
                    maxQueueSize: config.maxQueueSize,
                    bufferingTimeout: config.bufferingTimeout,
                    connectionTimeout: config.connectionTimeout
                }
            });
        } catch {
            return message.channel.send({ embeds: [messageEmbeds.catch_error] });
        };
    }
};