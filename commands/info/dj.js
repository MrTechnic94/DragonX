'use strict';

const db = require('../../utils/guildSettings.js');
const messageEmbeds = require('../../utils/messageEmbeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
  name: 'dj',
  permission: 'Administrator',
  run: async (_client, message, args) => {
    const guildData = await db.getGuildSettings(message.guild.id);

    switch (args[0]?.toLowerCase()) {
      default:
        const roleName = args.join(' ');

        const role = message.mentions.roles?.first() || message.guild.roles.cache.find((r) => r.name.toLowerCase() === roleName.toLowerCase()) || message.guild.roles.cache.get(roleName);

        if (!role) return message.channel.send({ embeds: [messageEmbeds.role_error] });

        if (guildData?.djRoleId === role.id) return message.channel.send({ embeds: [messageEmbeds.already_role_error] });

        await db.setGuildSettings(message.guild.id, guildData.prefix ?? process.env.PREFIX, role.id);

        message.channel.send({ embeds: [createEmbed({ description: `✅ **Ustawiono DJ rolę na:** ${role}` })] });
        break;

      case 'remove':
        if (!message.guild.roles.cache.has(guildData?.djRoleId)) return message.channel.send({ embeds: [messageEmbeds.dj_set_error] });

        await db.setGuildSettings(message.guild.id, guildData.prefix ?? process.env.PREFIX, null);

        message.channel.send({ embeds: [messageEmbeds.remove_dj_success] });
        break;
    };
  }
};