'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (_client, queue) => {
    const embed = new EmbedBuilder()
    .setDescription(`❌ **Skończyła się muzyka w playliście!**`)
    .setColor("Red")

    return queue.metadata.channel.send({embeds: [embed]});
};