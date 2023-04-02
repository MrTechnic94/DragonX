'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (_client, queue) => {

    const embed = new EmbedBuilder()
    .setDescription(`❌ **Błąd podczas odtwarzania utworu!**`)
    .setColor("Red")

    return queue.metadata.channel.send({embeds: [embed]});

};