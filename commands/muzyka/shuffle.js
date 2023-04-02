'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue || !queue.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    if (!queue.tracks.at(0)) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie ma żadnych piosenek do wymieszania!**`).setColor("Red")]});

    try {
        await queue.tracks.shuffle();
        return message.reply({embeds: [new EmbedBuilder().setDescription("🔀 **Mieszanie kolejki zostało włączone!**").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
    } catch {
        return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Mieszanie kolejki nie zostało włączone!**").setColor("Red")]});
    };

};

exports.info = {
    name: "shuffle",
    aliases: ['sh']
};
