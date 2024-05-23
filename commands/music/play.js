'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { clientPlayerOptions } = require('../../config/default');
const { createEmbed } = require('../../utils/embedCreator');
const { useMainPlayer } = require('discord-player');

module.exports = {
    name: 'play',
    aliases: ['p', 'songrequest', 'sr'],
    dj: true,
    cooldown: 2,
    async run(_client, message, args) {
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
            message.channel.send({ embeds: [createEmbed({ description: result.hasPlaylist() ? `✅ **Dodano \`${result.tracks.length}\` utwory z \`${result.playlist.title}\`**` : `✅ **Dodano \`${result.tracks[0].cleanTitle}\` do playlisty**` })] });

            await player.play(message.member.voice.channel, result, {
                nodeOptions: {
                    metadata: message.channel,
                    ...clientPlayerOptions
                }
            });
        } catch {
            return message.channel.send({ embeds: [messageEmbeds.catch_error] });
        }
    },
};