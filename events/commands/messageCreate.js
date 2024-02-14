'use strict';

const guildSettings = require('../../utils/guildSettings.js');
const { PermissionsBitField } = require('discord.js');
const { logger } = require('../../utils/consoleLogs.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const { embeds } = require('../../utils/embeds.js');

exports.run = async (client, message) => {
  // Sprawdzenie czy komenda zostala wykonana w gildi i czy autor komenda nie jest botem
  if (message.author.bot || !message.guild) return;

  // Utworzenie zmiennej, oraz przypisanie do niej wymaganych permisji bota
  const bot_permissions = [
    PermissionsBitField.Flags.SendMessages,
    PermissionsBitField.Flags.ReadMessageHistory,
    PermissionsBitField.Flags.SendMessagesInThreads,
    PermissionsBitField.Flags.Speak,
    PermissionsBitField.Flags.PrioritySpeaker,
    PermissionsBitField.Flags.Connect,
    PermissionsBitField.Flags.UseVAD,
    PermissionsBitField.Flags.EmbedLinks,
    PermissionsBitField.Flags.ViewChannel
  ];

  // Sprawdzenie permisji bota
  if (!message.guild.members.me.permissions.has(bot_permissions))
    return message.channel.send(`❌ **Nie posiadam permisji!**`).catch(() => {});

  const guildData = await guildSettings.findOne({ guildId: message.guild.id });
  const prefix = guildData?.prefix ?? process.env.PREFIX;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  // Bot odpowiada na oznaczenie
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`)))
    return message.channel.send({
      embeds: [
        createEmbed({
          description: `**Witaj** \`\`${message.author.tag}\`\`!\n**Mój prefix to:** \`\`${prefix}\`\`\n**Jeśli chcesz poznać więcej moich komend wpisz:** \`\`${prefix}help\`\``
        })]
    });

  if (!message.content.startsWith(prefix) || !cmd || cmd.info.stop) return;

  // Sprawdzenie czy uzytkownik ma wymagane permisje
  if (cmd.info.perm && !message.member.permissions.has(cmd.info.perm) || (cmd.ownerOnly && process.env.OWNER !== message.author.id))
    return message.channel.send({ embeds: [embeds.permission_error] });

  // Sprawdzenie czy uzytkownik ma dj role
  if (cmd.info.dj && guildData?.djRoleId && !message.member.roles.cache.has(guildData.djRoleId) && message.member.voice.channel.members.size > 1 && !message.member.permissions.has(PermissionsBitField.Flags.ManageMessages))
    return message.channel.send({ embeds: [embeds.dj_permission_error] });

  // Przechwytuje bledy komend i wyswietla w konsoli
  cmd.run(client, message, args).catch(err => {
    logger.error(`Komenda ${cmd.info.name} napotkala blad!\n${err}`);
  });
};