'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (_client, queue, track) => {
    const embed = new EmbedBuilder()
    .setDescription(`✅ **${track.title}** dodano do playlisty!`)
    .setColor('Red')

    return queue.metadata.channel.send({embeds: [embed]});
};