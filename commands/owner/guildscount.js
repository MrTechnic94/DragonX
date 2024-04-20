'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'guildcount',
    aliases: ['gc'],
    owner: true,
    cooldown: 2,
    run: async (client, message) => {
        return message.channel.send({ embeds: [createEmbed({ description: `📰 **Liczba serwerów: \`${client.guilds.cache.size}\`**` })] });
    }
};