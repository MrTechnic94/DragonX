'use strict';

const db = require('../../utils/guildSettings.js');
const messageEmbeds = require('../../utils/messageEmbeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'prefix',
    permission: 'Administrator',
    run: async (_client, message, args) => {
        const prefix = args[0] === 'clear' ? process.env.PREFIX : args[0];

        const guildData = await db.getGuildSettings(message.guild.id);

        const oldPrefix = guildData?.prefix ?? process.env.PREFIX;

        if (!prefix) return message.channel.send({ embeds: [messageEmbeds.prefix_change_error] });

        if (oldPrefix === prefix) return message.channel.send({ embeds: [messageEmbeds.already_prefix_error] });

        const guildId = message.guild.id;

        try {
            await db.setGuildSettings(guildId, prefix, guildData.djRoleId);
            return message.channel.send({ embeds: [createEmbed({ description: `✅ **Ustawiono nowy prefix: \`${prefix}\`**` })] });
        } catch {
            return message.channel.send({ embeds: [messageEmbeds.catch_error] });
        };
    }
};