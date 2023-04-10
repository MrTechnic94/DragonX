'use strict';

const { MessageEmbed } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie ma piosenek do wyczyszczenia!**`).setColor("RED")]});

    if (!queue.tracks[0]) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie ma żadnych piosenek do wyczyszczenia!**`).setColor("RED")]});

    if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("RED")]});

    try {
        await queue.clear();
        return message.reply({embeds: [new MessageEmbed().setDescription(`💨 **Kolejka zostala wyczyszczona!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("GOLD")]});
    } catch (error) {
        return message.reply({embeds: [new MessageEmbed().setDescription(`❌ Kolejka nie została wyczyszczona!`).setColor("RED")]});
}

};

exports.info = {
    name: "clear"
}