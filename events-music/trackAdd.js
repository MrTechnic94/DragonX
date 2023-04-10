'use strict';

const { MessageEmbed } = require('discord.js');

exports.run = async (client, queue, track) => {

    function SendEmbed(desc, channel){

    const embed = new MessageEmbed()
    .setDescription(desc)
    .setColor("GREEN")

    return channel.send({embeds: [embed]})

    }

    SendEmbed(`✅ **${track.title}** dodano do playlisty!`, queue.metadata);

};