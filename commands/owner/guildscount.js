'use strict';

const { createEmbed } = require('../../utils/embedCreator');

exports.run = async (client, message) => {
    return message.reply({embeds: [createEmbed({description: `📰 **Liczba Serwerów** ${client.guilds.cache.size}`})]});
};

exports.info = {
    name: "guildscount",
    aliases: ["gc"],
    owner: true
};
