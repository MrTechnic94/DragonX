'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.nodes.get(message.guild.id);

    if (!message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie mam mnie na kanale głosowym!**`).setColor("Red")]});

    if (!message.member?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na kanale głosowym!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    if (queue) await queue.delete();
    await message.guild.members.me?.voice.disconnect();
    return message.reply({embeds: [new EmbedBuilder().setDescription("🔮 **Wychodzę z kanału!**").setFooter({text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("Gold")]});

};

exports.info = {
    name: "leave",
    aliases: ['le']
};