'use strict';

const redis = require('../../utils/redis');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue, useTimeline, QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'settings',
    aliases: ['config', 'cfg'],
    cooldown: 2,
    async run(_client, message) {
        const queue = useQueue(message.guild.id);
        const timeline = useTimeline(message.guild.id);
        const guildData = await redis.hgetall(message.guild.id);
        const prefix = guildData?.prefix ?? process.env.PREFIX;
        const dj = guildData?.djRoleId ? `<@&${guildData.djRoleId}>` : '**`nie ustawiono`**';

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [createEmbed({ title: '🔧 Ustawienia serwera', description: `**Prefix: \`${prefix}\`**\n**DJ Rola:** ${dj}\n**Autoplay: \`wyłączony\`**\n**Loop: \`wyłączony\`**\n**Volume: \`100%\`**` })] });

        const autoplay = queue.repeatMode === QueueRepeatMode.AUTOPLAY ? '`włączony`' : '`wyłączony`';
        const loop = queue.repeatMode === QueueRepeatMode.OFF ? '`wyłączony`' : queue.repeatMode === QueueRepeatMode.TRACK ? '`piosenka`' : '`playlista`';

        return message.channel.send({
            embeds: [
                createEmbed({
                    title: '🔧 Ustawienia serwer',
                    description: `**Prefix: \`${prefix}\`**\n**DJ Rola:** ${dj}\n**Autoplay: ${autoplay}**\n**Loop: ${loop}**\n**Volume: \`${timeline.volume}%\`**`
                })
            ]
        });
    }
};