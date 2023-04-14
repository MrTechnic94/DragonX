'use strict';

const { MessageEmbed, Client } = require('discord.js');
const { mem, cpu } = require('node-os-utils');
const os = require('os-utils');
const prettyMilliseconds = require('pretty-ms');

exports.run = async (client, message) => {
    
    const embed = new MessageEmbed()
    .setTitle("⌚ Informacje Bota:")
    .setDescription(`**Uptime**\n\`\`🔮\`\` **Czas:** ${prettyMilliseconds(client.uptime)}\n\n**Informacje o Systemie**\n\`\`💻\`\` **System:** ${os.platform()}\n\`\`💾\`\` **Cpu:** ${await cpu.usage()}%\n\`\`🔩\`\` **Zużycie RAM:** ${(process.memoryUsage().rss / 1024 / 1024).toFixed(0)}mb`)
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("BLUE")

    return message.reply({embeds: [embed]})

};

exports.info = {
    name: "uptime"
}