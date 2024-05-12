'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue, QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
    aliases: ['repeat'],
    dj: true,
    cooldown: 2,
    async run(_client, message, args) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        const modes = {
            off: QueueRepeatMode.OFF,
            track: QueueRepeatMode.TRACK,
            queue: QueueRepeatMode.QUEUE
        };

        let requestedMode = args[0]?.toLowerCase();

        if (requestedMode && modes[requestedMode] !== undefined) {
            if (modes[requestedMode] === queue.repeatMode) {
                return message.channel.send({ embeds: [createEmbed({ description: `❌ **Tryb \`${requestedMode}\` jest już ustawiony**` })] });
            };

            queue.setRepeatMode(modes[requestedMode]);
        } else {
            queue.setRepeatMode(queue.repeatMode === QueueRepeatMode.OFF ? QueueRepeatMode.TRACK : (queue.repeatMode === QueueRepeatMode.TRACK ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF));
            requestedMode = 'toggle';
        };

        const modeName = queue.repeatMode === QueueRepeatMode.TRACK ? 'piosenki' : 'playlisty';

        const modeOff = queue.repeatMode === QueueRepeatMode.OFF ? 'Wyłączono' : 'Włączono';

        const modeEmoji = queue.repeatMode === QueueRepeatMode.QUEUE ? '🔂' : '🔁';

        return message.channel.send({ embeds: [createEmbed({ description: `${modeEmoji} **\`${modeOff}\` pętle dla \`${modeName}\`**` })] });
    }
};