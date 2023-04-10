'use strict';

const { MessageEmbed } = require('discord.js');
const { pagination } = require('reconlx');
require('dotenv').config({ path: __dirname + '../../.env' })

exports.run = async (client, message, args) => {
    
    const embed1 = new MessageEmbed()
    .setTitle('📰 Lista Komend')
    .setDescription('Naciśniej :arrow_forward: aby wyświetlić listę komend')
    
    const embed2 = new MessageEmbed()
    .setTitle('📰 Lista Komendw')
    .setDescription('Naciśniej ``▶`` aby wyświetlić listę komend')
    
    const embed3 = new MessageEmbed()
    .setTitle('📰 Lista Komends')
    .setDescription('Naciśniej ``▶`` aby wyświetlić listę komend')
    
    const embeds = [embed1, embed2, embed3];

    pagination({
        embeds: embeds,
        channel: message.channel,
        author: message.author,
        time: 10000,
    })

}

exports.info = {
    name: "test"
}