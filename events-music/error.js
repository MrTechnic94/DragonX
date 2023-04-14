'use strict'

const { MessageEmbed } = require('discord.js');

exports.run = async (client, queue, track, error) => {

    function SendEmbed(desc, channel){

    const embed = new MessageEmbed()
    .setDescription(desc)
    .setColor("RED")
        
    return channel.send({embeds: [embed]})

    }

    SendEmbed('❌ **Error!**', queue.metadata);

};