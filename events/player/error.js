'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');

module.exports = {
    name: 'error',
    run: async (_client, queue) => {
        return queue.metadata.send({ embeds: [messageEmbeds.catch_error] });
    }
};