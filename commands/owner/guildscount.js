'use strict';

const { EmbedBuilder } = require('discord.js');
require('dotenv').config({ path: `${__dirname}/../../.env` });

exports.run = async (client, message) => {

    if (message.author.id !== process.env.OWNER) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie posiadasz permisji by to zrobić!**`).setColor("Red")]});

    message.reply({embeds: [new EmbedBuilder().setDescription(`📰 **Liczba Serwerów** ${client.guilds.cache.size}`).setFooter({text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});

};

exports.info = {
    name: "guildscount",
    aliases: ['gc']
};