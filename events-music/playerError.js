'use strict';

const embeds = require('../utils/embeds.js');

exports.run = async (_client, queue) => {
    return queue.metadata.send({ embeds: [embeds.player_error] });
};