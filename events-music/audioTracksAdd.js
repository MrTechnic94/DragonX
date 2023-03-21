'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (_client, queue) => {

    function Message(desc) {

    const embed = new EmbedBuilder()
    .setDescription(desc)
    .setColor("Green")

    return queue.metadata.channel.send({embeds: [embed]});

};

    Message(`✅ W playliście **${queue.getSize()}** utworów!`, queue.metadata);

};