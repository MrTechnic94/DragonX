const { MessageEmbed } = require('discord.js');
require('dotenv').config({ path: __dirname + '../../.env' })

exports.run = async (client, message, args) => {

    const embed = new MessageEmbed()
    .setTitle("🏓 Pong")
    .setDescription(`**Ping:** ${Date.now() - message.createdTimestamp}ms\n**API Ping:** ${Math.round(client.ws.ping)}ms`)
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("GOLD")

    return message.reply({embeds: [embed]})

}

exports.info = {
    name: "test",
    premium: true
}