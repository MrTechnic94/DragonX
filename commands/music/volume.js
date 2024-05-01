'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const { useTimeline } = require('discord-player');

module.exports = {
    name: 'volume',
    aliases: ['v', 'vol'],
    dj: true,
    cooldown: 2,
    async run(_client, message, args) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const timeline = useTimeline(message.guild.id);

        if (!timeline?.track) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        const vol = parseInt(args[0]);

        const current_volume_emoji = timeline.volume === 0 ? '🔇' : timeline.volume >= 51 ? '🔊' : '🔉';

        if (isNaN(vol)) return message.channel.send({ embeds: [createEmbed({ description: `${current_volume_emoji} **Aktualna głośność: \`\`${timeline.volume}%\`\`**` })] });

        if (vol < 0 || vol > 200) return message.channel.send({ embeds: [messageEmbeds.max_volume_error] });

        if (timeline.volume === vol) return message.channel.send({ embeds: [messageEmbeds.already_volume_error] });

        if (vol === 0) {
            timeline.pause();
            timeline.setVolume(vol);
        } else {
            timeline.resume();
        };

        const volume_emoji = vol === 0 ? '🔇' : vol >= 51 ? '🔊' : '🔉';

        timeline.setVolume(vol);
        return message.channel.send({ embeds: [createEmbed({ description: `${volume_emoji} **Ustawiono głośność na \`\`${vol}%\`\`**` })] });
    }
};