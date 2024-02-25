'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const pretty = require('pretty-ms');
const os = require('os');

exports.run = async (client, message) => {

    const time = pretty(client.uptime);
    const sys = os.platform();
    const cpu_usage = os.loadavg()[0];
    const mem_usage = (process.memoryUsage().rss / 1024 / 1024).toFixed(0);

    return message.channel.send({
        embeds: [
            createEmbed({
                title: `⌚ Informacje bota`,
                description: `**Uptime**\n\`\`🔮\`\` **Czas:** ${time}\n\n**Informacje o systemie**\n\`\`💻\`\` **System:** ${sys}\n\`\`💾\`\` **Cpu:** ${cpu_usage}%\n\`\`🔩\`\` **Zużycie RAM:** ${mem_usage}mb`
            })]
    });
};

exports.info = {
    name: "uptime"
};