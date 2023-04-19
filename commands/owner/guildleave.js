'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
    let guild = client.guilds.cache.get(args[0]);
    if (!guild) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie znaleziono guildi z id \`\`${guild}\`\`**`).setColor('Red')]});

    message.reply({embeds: [new EmbedBuilder().setTitle(`✅ Pomyślnie bot wyszedł z gildi!`).setDescription(`**Guild name:**\n \`\`\`${guild.name}\`\`\`\n **Guild id:**\n \`\`\`${guild.id}\`\`\` `).setColor('Red')]});
    
    await guild.leave();
};

exports.info = {
    name: "guildleave",
    aliases: ['gleave'],
    owner: true
};