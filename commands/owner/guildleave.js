'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'guildleave',
    aliases: ['gleave'],
    owner: true,
    cooldown: 2,
    async run(client, message, args) {
        if (!args[0]) return message.channel.send({ embeds: [messageEmbeds.args_guild_id_error] });

        const guild = client.guilds.cache.get(args[0]);

        if (!guild) return message.channel.send({ embeds: [createEmbed({ description: `❌ **Nie znaleziono guildi z id \`${args[0]}\`**` })] });

        try {
            await guild.leave();

            return message.channel.send({ embeds: [createEmbed({ title: '✅ Bot pomyślnie wyszedł z guildi', description: `**Guild name:\n \`\`\`${guild.name}\`\`\`\n Guild id:\n \`\`\`${guild.id}\`\`\`**` })] });
        } catch {
            return message.channel.send({ embeds: [messageEmbeds.catch_error] });
        };
    }
};