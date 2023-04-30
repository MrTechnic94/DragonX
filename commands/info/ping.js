'use strict';

const { createEmbed } = require('../../utils/embedCreator');

exports.run = async (client, message) => {
    message.reply({
        embeds: 
        [createEmbed({
            title: `🏓 Pong`,
            description: `**Ping:** ${Date.now() - message.createdTimestamp}ms\n**API Ping:** ${Math.round(client.ws.ping)}ms`
        })
    ]});
};

exports.info = {
    name: "ping"
};