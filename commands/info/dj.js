'use strict';

const redis = require('../../utils/redis');
const messageEmbeds = require('../../utils/messageEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'dj',
  permission: PermissionsBitField.Flags.ManageMessages,
  cooldown: 2,
  async run(_client, message, args) {
    const guildData = await redis.hgetall(message.guild.id);
    let roleName;
    let role;

    switch (args[0]?.toLowerCase()) {
      default:
        roleName = args.join(' ');

        role = message.mentions.roles?.first() || message.guild.roles.cache.find((r) => r.name.toLowerCase() === roleName.toLowerCase()) || message.guild.roles.cache.get(roleName);

        if (!role) return message.channel.send({ embeds: [messageEmbeds.role_error] });

        if (guildData?.djRoleId === role.id) return message.channel.send({ embeds: [messageEmbeds.already_role_error] });

        await redis.hset(message.guild.id, {
          prefix: guildData.prefix ?? process.env.PREFIX,
          djRoleId: role.id
        });

        message.channel.send({ embeds: [createEmbed({ description: `✅ **Ustawiono DJ rolę na:** ${role}` })] });
        break;

      case 'remove':
        if (!message.guild.roles.cache.has(guildData?.djRoleId)) return message.channel.send({ embeds: [messageEmbeds.dj_set_error] });

        await redis.hset(message.guild.id, {
          prefix: guildData.prefix ?? process.env.PREFIX,
          djRoleId: null
        });

        message.channel.send({ embeds: [messageEmbeds.remove_dj_success] });
        break;
    };
  }
};