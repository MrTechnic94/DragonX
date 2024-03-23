'use strict';

const { useQueue } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

module.exports = {
    name: 'volume',
    aliases: ['v', 'vol'],
    dj: true,
    run: async (_client, message, args) => {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        const vol = parseInt(args[0]);

        const current_volume_emoji = queue.node.volume === 0 ? '🔇' : queue.node.volume >= 51 ? '🔊' : '🔉';

        if (isNaN(vol)) return message.channel.send({ embeds: [createEmbed({ description: `${current_volume_emoji} **Aktualna głośność: ${queue.node.volume}%**` })] });

        if (vol < 0 || vol > 200) return message.channel.send({ embeds: [messageEmbeds.max_volume_error] });

        if (queue.node.volume === vol) return message.channel.send({ embeds: [messageEmbeds.already_volume_error] });

        if (vol === 0) {
            queue.node.pause();
            queue.node.setVolume(vol);
        } else {
            queue.node.resume();
        };

        const volume_emoji = vol === 0 ? '🔇' : vol >= 51 ? '🔊' : '🔉';

        queue.node.setVolume(vol);
        return message.channel.send({ embeds: [createEmbed({ description: `${volume_emoji} **Ustawiono głośność na: ${vol}%**` })] });
    }
};