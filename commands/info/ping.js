'use strict';

const { createEmbed } = require('../../utils/embedCreator');

module.exports = {
    name: 'ping',
    aliases: ['latecy'],
    cooldown: 2,
    async run(client, message) {
        return message.channel.send({
            embeds: [
                createEmbed({
                    title: '🏓 Pong',
                    description: `**Latecy: \`${Date.now() - message.createdTimestamp}ms\`**\n**API Latecy: \`${Math.round(client.ws.ping)}ms\`**`
                })
            ]
        });
    }
};