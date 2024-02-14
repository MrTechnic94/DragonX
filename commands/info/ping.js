'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    return message.channel.send({
        embeds: [
            createEmbed({
                title: `🏓 Pong`,
                description: `**Latecy:** ${client.ws.ping}ms\n**API Latecy:** ${Date.now() - message.createdTimestamp}ms`
            })
        ]
    });
};

exports.info = {
    name: "ping",
    aliases: ["latecy"]
};