'use strict';

const { MessageEmbed } = require('discord.js');
require('dotenv').config({ path: __dirname + '../../.env' });
// const premiumSchema = require('../../models/premium.js');

exports.run = async (client, message, args) => {

    let then = Date.now();
    await premiumSchema.findOne({something: "nothing"});
    let now = Date.now();

    const embed = new MessageEmbed()
    .setTitle("🏓 Pong")
    .setDescription(`**Ping:** ${Date.now() - message.createdTimestamp}ms\n**API Ping:** ${Math.round(client.ws.ping)}ms\n**Database:** ${Math.round(now - then)}`)
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("GOLD")

    return message.reply({embeds: [embed]})

}

exports.info = {
    name: "test",
    premium: true
}