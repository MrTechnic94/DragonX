'use strict';

const pretty = require('pretty-ms');
const os = require('os');
const { createEmbed } = require('../../utils/embedCreator');

exports.run = async (client, message) => {
    return message.channel.send({
        embeds:
            [createEmbed({
                title: `⌚ Informacje bota`,
                description: `**Uptime**\n\`\`🔮\`\` **Czas:** ${pretty(client.uptime)}\n\n**Informacje o systemie**\n\`\`💻\`\` **System:** ${os.platform()}\n\`\`💾\`\` **Cpu:** ${os.loadavg()[0]}%\n\`\`🔩\`\` **Zużycie RAM:** ${(process.memoryUsage().rss / 1024 / 1024).toFixed(0)}mb`
            })]
    });
};

exports.info = {
    name: "uptime"
};