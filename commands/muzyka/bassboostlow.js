'use strict';

const { MessageEmbed } = require('discord.js');
const { Player } = require('discord-player');

exports.run = async (client, message, args) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("RED")]});

    if (args[0] === 'enabled') {
        await queue.setFilters({
            bassboost_low: true,
            normalizer2: true
        });
        setTimeout(() => {
            return message.reply({embeds: [new MessageEmbed().setDescription(`🎵 **Niski Bassboost został włączony!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("GREEN")]});
        }, queue.options.bufferingTimeout);
    }

    if (args[0] === 'disabled') {
        await queue.setFilters({
            bassboost_low: false,
            normalizer2: false
        });
        setTimeout(() => {
            return message.reply({embeds: [new MessageEmbed().setDescription(`🎵 **Niski Bassboost został wyłączony!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});
        }, queue.options.bufferingTimeout);
    }

}

exports.info = {
    name: "bassboostlow",
    aliases: ["bsl"]
}