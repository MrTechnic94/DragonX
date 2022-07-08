'use strict';

const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("RED")]});

    if (args[0] === 'on') {
        await queue.setFilters({
            bassboost_low: true,
            normalizer2: true
        });
        setTimeout(() => {
            return message.reply({embeds: [new MessageEmbed().setDescription(`🎵 **Niski Bassboost został włączony!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("GREEN")]});
        }, 3000);
    }

    if (args[0] === 'off') {
        await queue.setFilters({
            bassboost_low: false,
            normalizer2: false
        });
        setTimeout(() => {
            return message.reply({embeds: [new MessageEmbed().setDescription(`🎵 **Niski Bassboost został wyłączony!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});
        }, 3000);
    }

};

exports.info = {
    name: "bassboostlow",
    aliases: ["bsl"]
}