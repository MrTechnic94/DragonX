'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (_client, queue, tracks) => {

    function SendEmbed(desc) {

    const embed = new EmbedBuilder()
    .setDescription(desc)
    .setColor("Green")

    return queue.metadata.channel.send({embeds: [embed]});

};

    SendEmbed(`✅ W playliście **${tracks.length}** utworów!`, queue.metadata);

};