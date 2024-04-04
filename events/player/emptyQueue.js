'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');

module.exports = {
    name: 'emptyQueue',
    run: async (_client, queue) => {
        return queue.metadata.send({ embeds: [messageEmbeds.empty_queue_error] });
    }
};