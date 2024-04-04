'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');

module.exports = {
    name: 'playerError',
    run: async (_client, queue) => {
        return queue.metadata.send({ embeds: [messageEmbeds.player_error] });
    }
};