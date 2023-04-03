'use strict';

const { EmbedBuilder } = require('discord.js');
require('dotenv').config({ path: `${__dirname}/../../.env` });

exports.run = async (client, message, args) => {
    
    if (message.author.id !== process.env.OWNER) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie posiadasz permisji by to zrobić!**`).setColor("Red")]});

    let guild = client.guilds.cache.get(args[0]);
    if (!guild) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie znaleziono guildi z id \`\`${guild}\`\`**`).setColor("Red")]});

    await guild.leave();

    return message.reply({embeds: [new EmbedBuilder().setTitle(`✅ Pomyślnie bot wyszedł z gildi!`).setDescription(`**Guild name:**\n \`\`\`${guild.name}\`\`\`\n **Guild id:**\n \`\`\`${guild.id}\`\`\` `).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("Red")]});

};

exports.info = {
    name: "guildleave",
    aliases: ['gleave']
};
