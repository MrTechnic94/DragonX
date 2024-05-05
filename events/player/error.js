'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');

module.exports = {
    name: 'error',
    async run(_client, queue) {
        queue.metadata.send({ embeds: [messageEmbeds.catch_error] });
    }
};