'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {
    
    const embed = new EmbedBuilder()
    .setTitle("🏓 Pong")
    .setDescription(`**Ping:** ${Date.now() - message.createdTimestamp}ms\n**API Ping:** ${Math.round(client.ws.ping)}ms`)
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("Gold")

    return message.reply({embeds: [embed]})

};

exports.info = {
    name: "ping"
}