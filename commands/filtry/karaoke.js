'use strict';

const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("RED")]});

    if (args[0] === 'on') {
        await queue.setFilters({
            karaoke: true,
            normalizer2: true
        });
        setTimeout(() => {
            return message.reply({embeds: [new MessageEmbed().setDescription(`🎵 **Karaoke został włączony!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("GREEN")]});
        }, 3000);
    }
    
    if (args[0] === 'off') {
        await queue.setFilters({
            karaoke: false,
            normalizer2: false
        });
        setTimeout(() => {
            return message.reply({embeds: [new MessageEmbed().setDescription(`🎵 **Karaoke został wyłączony!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});
        }, 3000);
    }

};

exports.info = {
    name: "karaoke"
}