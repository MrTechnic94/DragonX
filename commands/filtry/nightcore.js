'use strict';

const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("RED")]});

    if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("RED")]});

    if (args[0] === 'on') {
        await queue.setFilters({
            nightcore: true,
            normalizer2: true
        });

        return message.reply({embeds: [new MessageEmbed().setDescription(`🎵 **Nightcore został włączony!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("GREEN")]});
    };

    if (args[0] === 'off') {
        await queue.setFilters({
            nightcore: false,
            normalizer2: false
        });
        return message.reply({embeds: [new MessageEmbed().setDescription(`🎵 **Nightcore został wyłączony!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});
    };

};

exports.info = {
    name: "nightcore",
    aliases: ["nc"]
}