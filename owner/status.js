'use strict';

const { EmbedBuilder, ActivityType } = require('discord.js');
require('dotenv').config({ path: __dirname + '../../.env' });

exports.run = async (client, message, args) => {

    if (message.author.id !== process.env.OWNER) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie posiadasz permisji by to zrobić!**`).setColor("Red")]});

    if (!args[0]) return message.reply({embeds: [new EmbedBuilder().setTitle("❌ Musisz podać nazwę statusu!").setColor("Red")]});

    let argument1 = args.join(' ');
    client.user.setPresence({ activities: [{ name: argument1, type: ActivityType.Listening }]});

    const embed = new EmbedBuilder()
    .setTitle("✅ Pomyślnie ustawiono status!")
    .setDescription(`Status został zmieniony na \`\`${argument1}\`\``)
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("Green")

    return message.reply({embeds: [embed]});

};

exports.info = {
    name: "status"
};