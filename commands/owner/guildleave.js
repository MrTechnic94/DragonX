'use strict';

const { createEmbed } = require('../../utils/embedCreator');

exports.run = async (client, message, args) => {
    let guild = client.guilds.cache.get(args[0]);
    if (!guild) return message.reply({embeds: [createEmbed({description: `❌ **Nie znaleziono guildi z id** \`\`${guild}\`\`**!**`})]});

    message.reply({embeds: [createEmbed({title: `✅ Pomyślnie bot wyszedł z gildi!`, description: `**Guild name:**\n \`\`\`${guild.name}\`\`\`\n **Guild id:**\n \`\`\`${guild.id}\`\`\``})]});
    
    await guild.leave();
};

exports.info = {
    name: "guildleave",
    aliases: ["gleave"],
    owner: true
};