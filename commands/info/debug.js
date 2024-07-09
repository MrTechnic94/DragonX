'use strict';

const os = require('node:os');
const { useMainPlayer } = require('discord-player');
const { formatTime } = require('../../utils/timeFormatter');
const { createEmbed } = require('../../utils/embedCreator');

module.exports = {
    name: 'debug',
    cooldown: 2,
    async run(client, message) {
        const player = useMainPlayer(message.guild.id);
        const formattedTime = formatTime(client.uptime);
        const system = os.platform();
        const cpuUsage = os.loadavg()[0];
        const memUsage = (process.memoryUsage().rss / 1024 / 1024).toFixed(0);

        return message.channel.send({
            embeds: [
                createEmbed({
                    title: '⌚ Informacje bota',
                    description: `**Uptime: \`${formattedTime}\`**\n**System: \`${system}\`**\n**Użycie Cpu: \`${cpuUsage}%\`**\n**Użycie Ram: \`${memUsage}mb\`**\n**Aktywne Połączenia: \`${player.generateStatistics().queues.length}\`**`
                }),
            ],
        });
    },
};