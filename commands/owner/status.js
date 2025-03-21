'use strict';

const { EmbedBuilder, ActivityType } = require('discord.js');

exports.run = async (client, message, args) => {

    if (!args[0]) return message.reply({embeds: [new EmbedBuilder().setTitle("❌ Musisz podać nazwę statusu!").setColor("Red")]});

    client.user.setPresence({activities: [{name: args.join(' '), type: ActivityType.Listening}]});

    const embed = new EmbedBuilder()
    .setTitle("✅ Pomyślnie ustawiono status!")
    .setDescription(`Status został zmieniony na \`\`${args.join(' ')}\`\``)
    .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("Green")

    return message.reply({embeds: [embed]});

};

exports.info = {
    name: "status",
    owner: true
};