'use strict';

const { MessageEmbed } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);
    const connection = getVoiceConnection(message.guild.id) 

    if(!connection) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Nie ma cię na żadnym kanale!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    await connection.destroy();
    return message.reply({embeds:[new MessageEmbed().setTitle("🔮 Wychodzę z kanału!").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("GOLD")]});

};

exports.info = {
    name: "leave"
}