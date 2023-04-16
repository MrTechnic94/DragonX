'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (_client, queue) => {
    
    const embed = new EmbedBuilder()
    .setDescription(`✅ Dodano **${queue.getSize()}** utwory do playlisty!`)
    .setColor("Green")

    return queue.metadata.channel.send({embeds: [embed]});

};