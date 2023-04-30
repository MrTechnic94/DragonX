'use strict';

const pretty = require('pretty-ms');
const { cpu, os } = require('node-os-utils');
const { createEmbed } = require('../../utils/embedCreator');

exports.run = async (client, message) => {
    message.reply({
        embeds:
            [createEmbed({
                title: `⌚ Informacje bota`, 
                description: `**Uptime**\n\`\`🔮\`\` **Czas:** ${pretty(client.uptime)}\n\n**Informacje o systemie**\n\`\`💻\`\` **System:**  ${os.platform()}\n\`\`💾\`\` **Cpu:** ${await cpu.usage()}%\n\`\`🔩\`\` **Zużycie RAM:** ${(process.memoryUsage().rss / 1024 / 1024).toFixed(0)}mb`
            })]
    });
};

exports.info = {
    name: "uptime"
};