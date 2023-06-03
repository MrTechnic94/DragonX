'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    try {
        const guild = client.guilds.cache.get(args[0]);
        if (!guild) return message.channel.send({ embeds: [createEmbed({ description: `❌ **Nie znaleziono guildi z id** \`\`${guild}\`\`**!**` })] });

        message.channel.send({ embeds: [createEmbed({ title: `✅ Pomyślnie bot wyszedł z gildi!`, description: `**Guild name:**\n \`\`\`${guild.name}\`\`\`\n **Guild id:**\n \`\`\`${guild.id}\`\`\`` })] });

        guild.leave();
    } catch {
        return message.channel.send({ embeds: [embeds.catch_error] })
    };

};

exports.info = {
    name: "guildleave",
    aliases: ["gleave"],
    owner: true
};