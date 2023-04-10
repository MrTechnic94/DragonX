'use strict';

const { MessageEmbed } = require('discord.js');

exports.run = async (client, queue, track) => {

    function SendEmbed(desc, channel){

    const embed = new MessageEmbed()
    .setDescription(desc)
    .setColor("RED")

    return channel.send({embeds: [embed]})

    }

    SendEmbed('❌ **Wychodzę z kanału bo mnie wyrzucono!**', queue.metadata);

};