'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const embeds = require('../../utils/embeds');

exports.run = async (client, message) => {
    try {
        return message.channel.send({ embeds: [createEmbed({ description: `📰 **Liczba serwerów:** ${client.guilds.cache.size}` })] });
    } catch {
        return message.channel.send({ embeds: [embeds.catch_error] });
    };
};

exports.info = {
    name: "guildscount",
    aliases: ["gc"],
    owner: true
};