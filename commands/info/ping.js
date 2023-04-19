'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {
    const embed = new EmbedBuilder()
    .setTitle('🏓 Pong')
    .setDescription(`**Ping:** ${Date.now() - message.createdTimestamp}ms\n**API Ping:** ${Math.round(client.ws.ping)}ms`)
    .setColor('Red')

    return message.reply({embeds: [embed]});
};

exports.info = {
    name: "ping"
};