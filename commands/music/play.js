'use strict';

const config = require('../../config/default.js');
const { useMainPlayer } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

module.exports = {
    name: 'play',
    aliases: ['p', 'songrequest', 'sr'],
    dj: true,
    run: async (_client, message, args) => {
        if (!args[0]) return message.channel.send({ embeds: [messageEmbeds.track_error] });

        if (!message.member?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.member_voice_error] });

        if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        if (message.member?.voice.channel.full && !message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.full_channel_error] });
        
        const player = useMainPlayer();

        const res = await player.search(args.join(' '), {
            requestedBy: message.member
        });

        if (!res.hasTracks()) return message.channel.send({ embeds: [messageEmbeds.track_error] });

        if (res.tracks.length > config.maxQueueSize) return message.channel.send({ embeds: [messageEmbeds.max_queue_error] });

        message.channel.send({ embeds: [createEmbed({ description: res.hasPlaylist() ? `✅ **Dodano \`\`${res.tracks.length}\`\` utwory do playlisty!**` : `✅ **Dodano \`\`${res.tracks[0].title}\`\` do playlisty!**` })] });

        try {
            await player.play(message.member.voice.channel, res, {
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