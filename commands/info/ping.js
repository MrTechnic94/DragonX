'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {
    return message.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle(`🏓 Pong`)
                .setDescription(`**Ping:** ${Date.now() - message.createdTimestamp}ms\n**API Ping:** ${Math.round(client.ws.ping)}ms`)
                .setColor('Red')]
    });
};

exports.info = {
    name: "ping"
};