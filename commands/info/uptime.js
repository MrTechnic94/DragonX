'use strict';

const { EmbedBuilder } = require('discord.js');
const { cpu, os } = require('node-os-utils');
const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message) => {
    
    const duration = moment.duration(client.uptime).format(" D[d] H[h] m[m] s[s]");

    const embed = new EmbedBuilder()
    .setTitle("⌚ Informacje bota")
    .setDescription(`**Uptime**\n\`\`🔮\`\` **Czas:** ${duration}\n\n**Informacje o systemie**\n\`\`💻\`\` **System:**  ${os.platform()}\n\`\`💾\`\` **Cpu:** ${await cpu.usage()}%\n\`\`🔩\`\` **Zużycie RAM:** ${(process.memoryUsage().rss / 1024 / 1024).toFixed(0)}mb`)
    .setFooter({text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("Blue")

    return message.reply({embeds: [embed]});

};

exports.info = {
    name: "uptime"
};