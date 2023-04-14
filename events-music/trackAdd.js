'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (_client, queue, track) => {

    function SendEmbed(desc) {

    const embed = new EmbedBuilder()
    .setDescription(desc)
    .setColor("Green")

    return queue.metadata.channel.send({embeds: [embed]});

};

    SendEmbed(`✅ **${track.title}** dodano do playlisty!`, queue.metadata);

};