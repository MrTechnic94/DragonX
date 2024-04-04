'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');
const { useQueue } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'pause',
    dj: true,
    run: async (_client, message) => {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        queue.node.setPaused(!queue.node.isPaused());

        const mode = queue.node.isPaused() ? `▶️ \`\`Zatrzymano\`\`` : `⏸️ \`\`Wznowiono\`\``;

        return message.channel.send({ embeds: [createEmbed({ description: `**${mode} odtwarzanie piosenki!**` })] });
    }
};