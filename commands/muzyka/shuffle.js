'use strict';

const { MessageEmbed } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("RED")]});

    if (!queue.tracks[0]) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie ma żadnych piosenek do wymieszania!**`).setColor("RED")]});

    if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("RED")]});

    try {
        queue.shuffle();
        return message.reply({embeds: [new MessageEmbed().setDescription("🔂 **Mieszanie kolejki zostało włączone!**").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setDescription("**Playlista została wymieszana**").setColor("6b3deb")]});
    } catch (error) {
        return message.reply({embeds: [new MessageEmbed().setDescription("❌ Mieszanie kolejki nie zostało włączone!").setColor("RED")]});
}

};

exports.info = {
    name: "shuffle"
}