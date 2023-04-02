'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {

    const queue = client.player.nodes.get(message.guild.id);

    const s = parseInt(args[0]);

    if (!queue || !queue.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    if (s * 1000 >= queue.currentTrack.durationMS) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Podany czas jest większa od długości utworu, lub równa!**`).setColor("Red")]});

    if (!s || s <= 0) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nieprawidłowa liczba!**`).setColor("Red")]});
    
    try {
        await queue.node.seek(args[0] * 1000);
        return message.reply({embeds: [new EmbedBuilder().setTitle(`🎵 Pomyślnie ustawiono czas odtwarzania!`).setDescription(`**Przeskoczyłeś odtwarzanie muzyki o: \`\`${args[0]} sekund\`\`**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("Blue")]});
    } catch {
        return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Błąd podczas ustawiania czasu odtwarzania!**`).setColor("Red")]});
    };

};

exports.info = {
    name: "seek",
    aliases: ['se']
};
