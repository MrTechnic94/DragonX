'use strict';

const redis = require('../../utils/redis.js');
const logger = require('../../utils/consoleLogger.js');
const messageEmbeds = require('../../utils/messageEmbeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const { Events, PermissionsBitField } = require('discord.js');
const cooldowns = new Map();

module.exports = {
  name: Events.MessageCreate,
  async run(client, message) {
    // Sprawdzenie czy komenda zostala wykonana w gildi i czy autor komenda nie jest botem
    if (message.author.bot || !message.guild) return;

    // Utworzenie zmiennej oraz przypisanie do niej wymaganych permisji dla bota
    const bot_permissions = [
      { name: PermissionsBitField.Flags.SendMessages, label: 'Send Messages' },
      { name: PermissionsBitField.Flags.ReadMessageHistory, label: 'Read Message History' },
      { name: PermissionsBitField.Flags.SendMessagesInThreads, label: 'Send Messages In Threads' },
      { name: PermissionsBitField.Flags.Speak, label: 'Speak' },
      { name: PermissionsBitField.Flags.PrioritySpeaker, label: 'Priority Speaker' },
      { name: PermissionsBitField.Flags.Connect, label: 'Connect' },
      { name: PermissionsBitField.Flags.UseVAD, label: 'Use Voice Activity' },
      { name: PermissionsBitField.Flags.EmbedLinks, label: 'Embed Links' },
      { name: PermissionsBitField.Flags.ViewChannel, label: 'View Channel' }
    ];

    // Sprawdzenie permisji bota
    const missingPermissions = bot_permissions.filter(permission => !message.guild.members.me.permissions.has(permission.name));

    if (missingPermissions.length > 0) {
      const missingPermissionNames = missingPermissions.map(permission => permission.label).join('\n');
      return message.channel.send(`❌ **Nie posiadam wymaganych permisji:\n\`\`\`${missingPermissionNames}\`\`\`**`).catch(() => { });
    };

    const guildData = await redis.hgetall(message.guild.id);
    const prefix = guildData?.prefix ?? process.env.PREFIX;
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) ?? client.commands.get(client.aliases.get(command));

    // Odpowiedzenie bota na oznaczenie
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`)))
      return message.channel.send({
        embeds: [
          createEmbed({
            description: `**Witaj** <@${message.author.id}>\n**Mój prefix to: \`${prefix}\`**\n**Jeśli chcesz poznać więcej moich komend wpisz: \`${prefix}help\`**`
          })]
      });

    if (!message.content.startsWith(prefix) || !cmd || cmd.stop) return;

    // Sprawdzenie czy komenda ma cooldown
    if (cmd.cooldown && cooldowns.has(cmd.name)) {
      const remainingTime = cooldowns.get(cmd.name) - Date.now();

      if (remainingTime > 0) {
        const shortenedTime = (remainingTime / 1000).toFixed(1);
        return message.channel.send({ embeds: [createEmbed({ description: `❌ **Cooldown nadal trwa, spróbuj za \`${shortenedTime}s\`**` })] });
      }
    };

    // Ustawienie nowego czasu wygasniecia cooldownu
    const cooldownTime = cmd.cooldown * 1000;
    const newExpirationTime = Date.now() + cooldownTime;
    cooldowns.set(cmd.name, newExpirationTime);
    setTimeout(() => cooldowns.delete(cmd.name), cooldownTime);

    // Sprawdzenie czy uzytkownik ma wymagane permisje
    if (cmd.permission && !message.member.permissions.has(cmd.permission) || (cmd.ownerOnly && process.env.OWNER_ID !== message.author.id))
      return message.channel.send({ embeds: [messageEmbeds.permission_error] });

    // Sprawdzenie czy uzytkownik ma dj role
    if (cmd.dj && guildData?.djRoleId && !message.member.roles.cache.has(guildData.djRoleId) && message.member.voice.channel?.members.size > 2 && !message.member.permissions.has(PermissionsBitField.Flags.ManageMessages))
      return message.channel.send({ embeds: [messageEmbeds.dj_permission_error] });

    // Przechwytuje i wyswietla bledy komend
    cmd.run(client, message, args).catch(err => {
      logger.error(`Komenda ${cmd.name} napotkala blad\n${err}`);
    });
  }
};