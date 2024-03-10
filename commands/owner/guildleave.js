'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send({ embeds: [messageEmbeds.args_guild_id] });

    const guild = client.guilds.cache.get(args[0]);
    
    if (!guild) return message.channel.send({ embeds: [createEmbed({ description: `❌ **Nie znaleziono guildi z id:** \`\`${args[0]}\`\`**!**` })] });

    message.channel.send({ embeds: [createEmbed({ title: `✅ Bot pomyślnie wyszedł z gildi!`, description: `**Guild name:**\n \`\`\`${guild.name}\`\`\`\n **Guild id:**\n \`\`\`${guild.id}\`\`\`` })] });

    guild.leave().catch(() => {
        return message.channel.send({ embeds: [messageEmbeds.catch_error] });
    });
};

exports.info = {
    name: "guildleave",
    aliases: ["gleave"],
    owner: true
};