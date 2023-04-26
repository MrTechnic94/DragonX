'use strict';

const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const GuildSettings = require('../../utils/guildSettings.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
  let guildData = await GuildSettings.findOne({guildId: message.guild.id});
  let prefix = guildData?.prefix || process.env.PREFIX;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  
  if (message.author.bot || !message.guild) return;

  // -----> Sprawdzenie permisji bota <-----
  if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages && PermissionsBitField.Flags.ReadMessageHistory && PermissionsBitField.Flags.SendMessagesInThreads && PermissionsBitField.Flags.Speak && PermissionsBitField.Flags.PrioritySpeaker && PermissionsBitField.Flags.Connect && PermissionsBitField.Flags.UseVAD && PermissionsBitField.Flags.EmbedLinks))
    return message.channel.send('❌ **Nie posiadam permisji!**');

  // -----> Bot odpowiada na oznaczenie <-----
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**Witaj** \`\`${message.author.tag}\`\`**!**\n**Mój prefix to:** \`\`${prefix}\`\`\n**Jeśli chcesz poznać więcej moich komend wpisz:** \`\`${prefix}help\`\``)
          .setColor('Red')]
    });
  };
  
  if (!message.content.startsWith(prefix) || !cmd || cmd.info.stop) return;

  // ----> Sprawdzenie czy uzytkownik ma permisje <----
  if (cmd.info.perm && !message.member.permissions.has(cmd.info.perm) || (cmd.ownerOnly && process.env.OWNER !== message.author.id))
    return message.channel.send({embeds: [embeds.permission_error]});

  // -----> Sprawdzenie czy uzytkownik ma dj role <-----
  if (cmd.info.dj && guildData && guildData.djRoleId && !message.member.roles.cache.has(guildData.djRoleId))
    return message.channel.send({embeds: [embeds.dj_permission_error]});

  cmd.run(client, message, args).catch(error => {
    console.error(`[${"\x1b[31m"}Error${"\x1b[0m"}] \x1b[31mKomenda ${cmd.info.name} napotkala blad:\x1b[0m\n${error}`);
  });
};
