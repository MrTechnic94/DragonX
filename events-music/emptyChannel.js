'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (_client, queue) => {

    function Message(desc) {

    const embed = new EmbedBuilder()
    .setDescription(desc)
    .setColor("Red")

    return queue.metadata.channel.send({embeds: [embed]});

};

    Message('❌ **Wychodzę z kanału bo jest pusty!**', queue.metadata);

};