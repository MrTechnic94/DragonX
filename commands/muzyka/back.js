'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (queue.previousTracks.length < 1) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie ma poprzedniego piosenek!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return await message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    try {
        await queue.back();
        return message.reply({embeds: [new EmbedBuilder().setDescription(`◀ **Właśnie odtwarzam poprzeniu utwór**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
    } catch (error) {
        return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie ma poprzedniego utwór!**`).setColor("Red")]});
    };

};

exports.info = {
    name: "back"
}