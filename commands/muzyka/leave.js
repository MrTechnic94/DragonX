'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!message.member?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie ma mnie na żadnym kanale!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return await message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    try {
        if (queue) await queue.destroy();
        await message.guild.members.me?.voice.disconnect();
        return message.reply({embeds: [new EmbedBuilder().setDescription("🔮 **Wychodzę z kanału!**").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("Gold")]});
    } catch (error) {
        return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Nie mogę wyjść z kanału!**").setColor("Red")]});
    };

};

exports.info = {
    name: "leave"
}