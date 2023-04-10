'use strict';

const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("RED")]});

    const vol = parseInt(args[0]);

    if (vol < 0 || vol > 100) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Zakres głośności musi wynosić 0-100!**`).setColor("RED")]});

    if (!vol) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nieprawidłowa liczba**`).setColor("RED")]})
  
    if (queue.volume === vol) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Podana głośność jest obecnie używana!**`).setColor("RED")]});

    if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("RED")]});

    try {
        queue.setVolume(vol);
        return message.reply({embeds: [new MessageEmbed().setDescription(`🔊 **Ustawiono głośność na: ${vol}!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("BLUE")]});
    } catch (error) {
        return message.reply({embeds: [new MessageEmbed().setDescription(`❌ Błąd podczas zmieniana głośności!`).setColor("RED")]});
}

};

exports.info = {
    name: "volume"
}