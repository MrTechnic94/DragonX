'use strict';

const db = require('../../utils/guildSettings.js');
const { useQueue, useTimeline, QueueRepeatMode } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'settings',
    aliases: ['config', 'cfg'],
    run: async (_client, message) => {
        const queue = useQueue(message.guild.id);
        const timeline = useTimeline(message.guild.id);
        const guildData = await db.getGuildSettings(message.guild.id);
        const prefix = guildData?.prefix ?? process.env.PREFIX;
        const dj = guildData?.djRoleId ? `<@&${guildData.djRoleId}>` : '**``nie ustawiono``**';

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [createEmbed({ title: `🔧 Ustawienia serwera`, description: `**Prefix: \`\`${prefix}\`\`**\n**DJ Rola:** ${dj}\n**Autoplay: \`\`wyłączony\`\`**\n**Loop: \`\`wyłączony\`\`**\n**Volume: \`\`100%\`\`**` })] });

        const autoplay = queue.repeatMode === QueueRepeatMode.AUTOPLAY ? '`włączony`' : '`wyłączony`';
        const loop = queue.repeatMode === QueueRepeatMode.OFF ? '`wyłączony`' : queue.repeatMode === QueueRepeatMode.TRACK ? '`track`' : '`playlist`';

        return message.channel.send({
            embeds: [
                createEmbed({
                    title: `🔧 Ustawienia serwera`,
                    description: `**Prefix: \`\`${prefix}\`\`**\n**DJ Rola:** ${dj}\n**Autoplay: ${autoplay}**\n**Loop: ${loop}**\n**Volume: \`\`${timeline.volume}%\`\`**`
                })
            ]
        });
    }
};