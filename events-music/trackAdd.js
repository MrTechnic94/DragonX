'use strict';

const { MessageEmbed } = require('discord.js');

exports.run = async (_client, queue, track) => {

    function SendEmbed(desc, _channel) {

    const embed = new MessageEmbed()
    .setDescription(desc)
    .setColor("GREEN")

    return queue.metadata.channel.send({embeds: [embed]})

    }

    SendEmbed(`✅ **${track.title}** dodano do playlisty!`, queue.metadata);

};