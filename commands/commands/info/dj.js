'use strict';

const GuildSettings = require('../../utils/guildSettings.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (_client, message, args) => {
  try {
    const guildData = await GuildSettings.findOne({ guildId: message.guild.id });

    switch (args[0]?.toLowerCase()) {
      default:
        const roleName = args.join(' ');
        const role = message.mentions.roles?.first() || message.guild.roles.cache.find((r) => r.name.toLowerCase() === roleName.toLowerCase()) || message.guild.roles.cache.get(roleName);

        if (!role) return message.channel.send({ embeds: [embeds.role_error] });

        if (guildData?.djRoleId === role.id) return message.channel.send({ embeds: [embeds.already_role_error] });

        await GuildSettings.updateOne({ guildId: message.guild.id }, { djRoleId: role.id }, { upsert: true, new: true });

        message.channel.send({ embeds: [createEmbed({ description: `✅ **Ustawiono DJ rolę na:** ${role}` })] });
        break;

      case 'remove':
        if (!message.guild.roles.cache.has(guildData?.djRoleId)) return message.channel.send({ embeds: [embeds.dj_set_error] });

        await GuildSettings.updateOne({ guildId: message.guild.id }, { djRoleId: null }, { upsert: true, new: true });

        message.channel.send({ embeds: [createEmbed({ description: `✅ **Usunięto DJ rolę!**` })] });
        break;
    };
  } catch {
    return message.channel.send({ embeds: [embeds.catch_error] });
  };
};

exports.info = {
  name: "dj",
  perm: "Administrator"
};