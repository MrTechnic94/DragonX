'use strict';

const { EmbedBuilder } = require('discord.js');
const GuildSettings = require('../../utils/guildSettings.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (_client, message, args) => {
  const roleName = args.join(' ');
  const role = message.mentions.roles?.first() || message.guild.roles.cache.find((r) => r.name.toLowerCase() === roleName.toLowerCase());
    
  if (!role) return message.reply({embeds: [embeds.role_error]});
    
  const guildData = await GuildSettings.findOne({guildId: message.guild.id});

  if (guildData?.djRoleId === role.id) return message.reply({embeds: [embeds.already_role_error]});

  await GuildSettings.updateOne({guildId: message.guild.id}, {djRoleId: role.id}, {upsert: true, new: true});

  return message.reply({embeds: [new EmbedBuilder().setDescription(`✅ **Ustawiono DJ rolę na:** ${role}`).setColor('Red')]});
};

exports.info = {
  name: "djset",
  perm: "Administrator"
};
