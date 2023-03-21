'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {

    const queue = client.player.nodes.get(message.guild.id);
    const vol = parseInt(args[0]);

    if (!queue || !queue.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (vol < 0 || vol > 100) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Zakres głośności musi wynosić 0-100!**`).setColor("Red")]});

    if (!vol) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nieprawidłowa liczba**`).setColor("Red")]})
  
    if (queue.node.volume === vol) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Podana głośność jest obecnie używana!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return await message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    try {
        queue.node.setVolume(vol);
        return message.reply({embeds: [new EmbedBuilder().setDescription(`🔊 **Ustawiono głośność na: ${vol}!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("Blue")]});
    } catch {
        return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Błąd podczas zmieniana głośności!**`).setColor("Red")]});
    };

};

exports.info = {
    name: "volume"
}