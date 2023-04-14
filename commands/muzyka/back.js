'use strict';

const { MessageEmbed } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("RED")]});

    if (queue.previousTracks.length < 1) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie ma poprzedniego piosenek!**`).setColor("RED")]});

    if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("RED")]});

    try {
        await queue.back();
        return message.reply({embeds: [new MessageEmbed().setDescription(`◀ **Właśnie odtwarzam poprzeniu utwór**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
    } catch (error) {
        return message.reply({embeds: [new MessageEmbed().setDescription(`❌ Nie ma poprzedniego utwór!`).setColor("RED")]});
    }

};

exports.info = {
    name: "back"
}