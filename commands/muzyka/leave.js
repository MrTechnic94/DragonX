'use strict'

const { MessageEmbed } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue.connection) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Nie ma cię na żadnym kanale!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    if (queue) await queue.destroy();
    message.guild.me.voice.disconnect();

    return message.reply({embeds:[new MessageEmbed().setTitle("🔮 Wychodzę z kanału!").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("GOLD")]});

};

exports.info = {
    name: "leave"
}