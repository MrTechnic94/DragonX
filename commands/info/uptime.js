'use strict';

const { EmbedBuilder } = require('discord.js');
const { cpu, os } = require('node-os-utils');
const pretty = require('pretty-ms');

exports.run = async (client, message) => {

    const embed = new EmbedBuilder()
    .setTitle("⌚ Informacje bota")
    .setDescription(`**Uptime**\n\`\`🔮\`\` **Czas:** ${pretty(client.uptime)}\n\n**Informacje o systemie**\n\`\`💻\`\` **System:**  ${os.platform()}\n\`\`💾\`\` **Cpu:** ${await cpu.usage()}%\n\`\`🔩\`\` **Zużycie RAM:** ${(process.memoryUsage().rss / 1024 / 1024).toFixed(0)}mb`)
    .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("Blue")

    return message.reply({embeds: [embed]});

};

exports.info = {
    name: "uptime"
};