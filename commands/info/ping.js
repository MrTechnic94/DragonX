'use strict';

const { createEmbed } = require('../../utils/embedCreator');

exports.run = async (client, message) => {
    try {
        return message.channel.send({
            embeds: [
                createEmbed({
                    title: `🏓 Pong`,
                    description: `**Ping:** ${Date.now() - message.createdTimestamp}ms\n**API Ping:** ${Math.round(client.ws.ping)}ms`
                })
            ]
        });
    } catch {
        return message.channel.send({ embeds: [embeds.catch_error] });
    };
};

exports.info = {
    name: "ping"
};