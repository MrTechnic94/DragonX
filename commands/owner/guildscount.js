'use strict';

const { EmbedBuilder } = require('discord.js');
require('dotenv').config({ path: __dirname + '../../.env' });

exports.run = async (client, message) => {

    if (message.author.id == process.env.OWNER) {

        return message.reply({embeds: [new EmbedBuilder().setDescription(`📰 **Liczba Serwerów** ${client.guilds.cache.size}`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});

    } else {

        message.channel.send('❌ Nie masz uprawnień do użycia tej komendy!');

    };
};

exports.info = {
    name: "guildscount",
    aliases: ['gc']
};