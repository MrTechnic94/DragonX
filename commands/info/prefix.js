'use strict';

const redis = require('../../utils/redis');
const messageEmbeds = require('../../utils/messageEmbeds');
const { createEmbed } = require('../../utils/embedCreator');

module.exports = {
    name: 'prefix',
    permission: 'Administrator',
    cooldown: 2,
    async run(_client, message, args) {
        const prefix = args[0] === 'clear' ? process.env.PREFIX : args[0];

        const guildData = await redis.hgetall(message.guild.id);

        const oldPrefix = guildData?.prefix ?? process.env.PREFIX;

        if (!prefix) return message.channel.send({ embeds: [messageEmbeds.prefix_change_error] });

        if (oldPrefix === prefix) return message.channel.send({ embeds: [messageEmbeds.already_prefix_error] });

        try {
            await redis.hset(message.guild.id, {
                prefix: prefix,
                djRoleId: guildData.djRoleId
            });

            return message.channel.send({ embeds: [createEmbed({ description: `✅ **Ustawiono nowy prefix: \`${prefix}\`**` })] });
        } catch {
            return message.channel.send({ embeds: [messageEmbeds.catch_error] });
        };
    }
};