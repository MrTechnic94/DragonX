'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {
    message.reply({embeds: [new EmbedBuilder().setDescription(`📰 **Liczba Serwerów** ${client.guilds.cache.size}`).setColor('Red')]});
};

exports.info = {
    name: "guildscount",
    aliases: ['gc'],
    owner: true
};