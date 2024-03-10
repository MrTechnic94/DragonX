'use strict';

const { useQueue, QueueRepeatMode } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

exports.run = async (_client, message, args) => {
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
            return message.channel.send({ embeds: [createEmbed({ description: `❌ **Tryb ${requestedMode} jest już ustawiony!**` })] });
        };

        queue.setRepeatMode(modes[requestedMode]);
    } else {
        queue.setRepeatMode(queue.repeatMode === QueueRepeatMode.OFF ? QueueRepeatMode.TRACK : (queue.repeatMode === QueueRepeatMode.TRACK ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF));
        requestedMode = 'toggle';
    };

    const mode = queue.repeatMode === QueueRepeatMode.TRACK ? 'piosenki' : 'playlisty';

    const mode_off = queue.repeatMode === QueueRepeatMode.OFF ? 'Wyłączono' : 'Włączono';

    const mode_emoji = queue.repeatMode === QueueRepeatMode.QUEUE ? '🔂' : '🔁';

    return message.channel.send({ embeds: [createEmbed({ description: `${mode_emoji} **${mode_off} pętle dla ${mode}**` })] });
};

exports.info = {
    name: "loop",
    aliases: ["repeat"],
    dj: true
};