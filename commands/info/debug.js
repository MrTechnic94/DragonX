'use strict';

const os = require('node:os');
const { formatTime } = require('../../utils/timeFormatter.js');
const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'debug',
    cooldown: 2,
    async run(client, message) {
        const time = formatTime(client.uptime);
        const sys = os.platform();
        const cpuUsage = os.loadavg()[0];
        const memUsage = (process.memoryUsage().rss / 1024 / 1024).toFixed(0);

        return message.channel.send({
            embeds: [
                createEmbed({
                    title: '⌚ Informacje bota',
                    description: `**Uptime: \`${time}\`**\n**System: \`${sys}\`**\n**Użycie Cpu: \`${cpuUsage}%\`**\n**Użycie Ram: \`${memUsage}mb\`**`
                })
            ]
        });
    }
};