'use strict';

const { messageEmbeds } = require('../utils/messageEmbeds.js');

exports.run = async (_client, queue) => {
    return queue.metadata.send({ embeds: [messageEmbeds.empty_queue_error] });
};