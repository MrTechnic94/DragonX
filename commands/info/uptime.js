'use strict';

const { formatTime } = require('../../utils/formatTime.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const os = require('os');

module.exports = {
    name: 'uptime',
    run: async (client, message) => {
        const time = formatTime(client.uptime);
        const sys = os.platform();
        const cpu_usage = os.loadavg()[0];
        const mem_usage = (process.memoryUsage().rss / 1024 / 1024).toFixed(0);

        return message.channel.send({
            embeds: [
                createEmbed({
                    title: `⌚ Informacje bota`,
                    description: `**Uptime: \`\`${time}\`\`**\n**System: \`\`${sys}\`\`**\n**Użycie Cpu: \`\`${cpu_usage}%\`\`**\n**Użycie Ram: \`\`${mem_usage}mb\`\`**`
                })
            ]
        });
    }
};