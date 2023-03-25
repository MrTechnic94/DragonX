'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {

    const queue = client.player.nodes.get(message.guild.id);
    const index = args[0] - 1;
    
    if (!queue || !queue.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    if (index === undefined || args[0] < 1 || args[0] > queue.tracks.size) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nieprawidłowa liczba!**`).setColor("Red")]});

    if (isNaN(index)) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ \`\`${args[0]}\`\` **nie jest liczbą!**`).setColor("Red")]});

    const track = queue.tracks.at(index).title;

    try {
        await queue.node.skipTo(index);
        return message.reply({embeds: [new EmbedBuilder().setTitle(`⏩ Przeskoczyłeś do utworu`).setDescription(`**Przeskoczyłeś:** \`\`${track}\`\``).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
    } catch {
        return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie mogę przeskoczyć do tego utworu!**`).setColor("Red")]});
    };


};

exports.info = {
    name: "jump",
    aliases: ['j']
};