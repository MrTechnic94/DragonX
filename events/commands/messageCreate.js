'use strict';

const { EmbedBuilder, PermissionsBitField } = require('discord.js');
require('dotenv').config({ path: __dirname + '../../.env' });

exports.run = async (client, message) => {

  const prefix = process.env.PREFIX;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  if (message.author.bot) return;
  if (message.channel.type == "DM") return;

  // -----> Bot odpowiada na oznaczenie <-----
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    const embed = new EmbedBuilder()
      .setDescription(`**Witaj** ${message.author.tag}!\n**Mój prefix to:** \`\`${prefix}\`\`\n**Jeśli chcesz poznać więcej moich komend wpisz:** \`\`${prefix}help\`\``)
      .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
      .setColor("Blue")

    return message.reply({embeds: [embed]});
  };

  if (message.content.indexOf(prefix) !== 0) return;

  // -----> Sprawdzenie permisji bota <-----
  if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator))
    return message.channel.send('❌ Nie posiadam permisji!\n**Wymagane:** ``ADMINISTRATOR``');

  if (!cmd) return;

  if (cmd.info.perm && message.guild && !cmd.info.DM) {

    if (!message.member.permissions.has(cmd.info.perm)) {
      message.delete()
      const ydhp = new EmbedBuilder()
        .setDescription("❌ Nie posiadasz permisji by to zrobić!")
        .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
        .setColor("Red")

      console.log("\x1b[0m" + (`[`) + "\x1b[31m" + (`Manager`) + "\x1b[0m" + (`]`) + "\x1b[31m" + `Uzytkownik ${message.author.id} (${message.author.tag}) chcial wykonac komende ${cmd.info.name} (guild: ${message.guild.id})`);
      return message.channel.send({embeds: [ydhp]}).then(m => m.delete({timeout: 5000}));
    }
  };

  if (cmd.info.stop === true) return;

  try {
    cmd.run(client, message, args);
  } catch (error) {
    const embederr = new EmbedBuilder()
      .setDescription(cmd.info.name + ' ERROR!:\n' + error)
      .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
      .setColor("Red")

    console.log("\x1b[0m" + (`[`) + "\x1b[31m" + (`Manager`) + "\x1b[0m" + (`]`) + "\x1b[31m" + `Podczas wykonywania komendy ${cmd.info.name} wystapil blad\n${error}`);
    return message.channel.send({embeds: [embederr]});
  };

};