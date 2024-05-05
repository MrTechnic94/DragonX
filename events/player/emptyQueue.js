'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');

module.exports = {
    name: 'emptyQueue',
    async run(_client, queue) {
        queue.metadata.send({ embeds: [messageEmbeds.empty_queue_error] });
    }
};