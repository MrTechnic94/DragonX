'use strict';

const { MessageEmbed } = require('discord.js');
const finder = require('lyrics-finder');

exports.run = async (client, args, message, title, artist) => {

    let lyrics = await finder(title, artist);

    // if(!lyrics) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Nie ma żadnej puszczonej piosenki!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    const embed = new MessageEmbed()
    .setTitle(`🎵 Tekst dla piosenki - ${args}`)
    .setDescription(`${lyrics}`)
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("RED")
    
    return message.reply({embeds: [embed]})

}

exports.info = {
    name: "lyrics",
    aliases: ['ls']
}