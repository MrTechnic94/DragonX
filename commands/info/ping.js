'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'ping',
    aliases: ['latecy'],
    run: async (client, message) => {
        return message.channel.send({
            embeds: [
                createEmbed({
                    title: `🏓 Pong`,
                    description: `**Latecy:** ${Date.now() - message.createdTimestamp}ms\n**API Latecy:** ${Math.round(client.ws.ping)}ms`
                })
            ]
        });
    }
};