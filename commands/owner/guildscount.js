'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {
    message.reply({embeds: [new EmbedBuilder().setDescription(`📰 **Liczba Serwerów** ${client.guilds.cache.size}`).setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
};

exports.info = {
    name: "guildscount",
    aliases: ['gc'],
    owner: true
};