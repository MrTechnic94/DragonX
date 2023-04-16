'use strict';

const { EmbedBuilder } = require('discord.js');
const GuildSettings = require('../../models/GuildSettings.js');

exports.run = async (_client, message, args) => {
  const roleName = args.join(' ');
  const role = message.mentions.roles?.first() || message.guild.roles.cache.find((r) => r.name.toLowerCase() === roleName.toLowerCase());
    
  if (!role) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie znaleziono takiej roli!**`).setColor("Red")]});
    
  const guildData = await GuildSettings.findOne({guildId: message.guild.id});

  if (guildData?.djRoleId === role.id) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Ta rola jest już ustawiona!**`).setColor("Red")]});

  await GuildSettings.updateOne({guildId: message.guild.id}, {djRoleId: role.id}, {upsert: true, new: true});

  return message.reply({embeds: [new EmbedBuilder().setDescription(`✅ **Ustawiono DJ rolę na:** ${role}`).setColor("Green")]});
};

exports.info = {
  name: "djset",
  perm: "Administrator"
};
