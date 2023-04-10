'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (_client, queue) => {

    function SendEmbed(desc) {

    const embed = new EmbedBuilder()
    .setDescription(desc)
    .setColor("Red")

    return queue.metadata.channel.send({embeds: [embed]});

};

    SendEmbed('❌ **Skończyła się muzyka w playliście!**', queue.metadata);

};