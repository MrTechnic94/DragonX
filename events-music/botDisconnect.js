'use strict';

const { MessageEmbed } = require('discord.js');

exports.run = async (_client, queue) => {

    function SendEmbed(desc, _channel){

    const embed = new MessageEmbed()
    .setDescription(desc)
    .setColor("RED")

    return queue.metadata.channel.send({embeds: [embed]})

    }

    SendEmbed('❌ **Wychodzę z kanału bo mnie wyrzucono!**', queue.metadata);

};