const { MessageEmbed, Client } = require('discord.js');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const prettyMilliseconds = require('pretty-ms');

exports.run = async (client, message) => {
    
    const ms = client.uptime
    const { totalMemMb, usedMemMb } = await mem.info();

    const embed = new MessageEmbed()
    .setTitle("⌚ Informacje Bota:")
    .setDescription(`**Uptime**\n\`\`🔮\`\` **Czas:** ${prettyMilliseconds(client.uptime)}\n\n**Informacje o Systemie**\n\`\`💻\`\` **System:** ${await os.oos()}\n\`\`💾\`\` **Cpu:** ${await cpu.usage()}%\n\`\`🔩\`\` **Zużycie RAM:** ${(process.memoryUsage().rss / 1024 / 1024).toFixed(0)}mb`)
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("BLUE")

    return message.reply({embeds: [embed]})

};

exports.info = {
    name: "uptime"
}