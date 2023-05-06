'use strict';

const { createEmbed } = require('../../utils/embedCreator');

exports.run = async (client, message) => {
    return message.channel.send({embeds: [createEmbed({description: `📰 **Liczba serwerów:** ${client.guilds.cache.size}`})]});
};

exports.info = {
    name: "guildscount",
    aliases: ["gc"],
    owner: true
};
