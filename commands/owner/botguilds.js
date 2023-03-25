'use strict';

const { EmbedBuilder } = require('discord.js');
require('dotenv').config({ path: __dirname + '../../.env' });

exports.run = async (client, message) => {

    if (message.author.id == process.env.OWNER) {

        let servers = '';
        
        servers = client.guilds.cache
            .map(g => `Guild: ${g.name}\n Guild ID: ${g.id}`)
            .join('\n\n');

        return message.reply({embeds: [new EmbedBuilder().setTitle(`📰 Lista Serwerów (${client.guilds.cache.size})`).setDescription(`${servers}`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});

    } else {

        message.channel.send('❌ Nie masz uprawnień do użycia tej komendy!');

    };
};

exports.info = {
    name: "botguilds",
    aliases: ['bg']
};