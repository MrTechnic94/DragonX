'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    if (message.author.id !== process.env.OWNER) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie posiadasz permisji by to zrobić!**`).setColor("Red")]});

     let servers = '';
        
    servers = client.guilds.cache
        .map(g => `Guild: ${g.name}\n Guild ID: ${g.id}`)
        .join('\n\n');

    return message.reply({embeds: [new EmbedBuilder().setTitle(`📰 Lista Serwerów (${client.guilds.cache.size})`).setDescription(`${servers}`).setFooter({text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});

};

exports.info = {
    name: "botguilds",
    aliases: ['bg']
};