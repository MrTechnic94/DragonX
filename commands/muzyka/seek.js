'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue || !queue.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return await message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    if (args[0] * 1000 >= queue.currentTrack.durationMS) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Podana pozycja jest większa od długości utworu, lub równa!**`).setColor("Red")]});

    if (args[0] === undefined || args[0] <= 0) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nieprawidłowa liczba!**`).setColor("Red")]});

    if (isNaN(args[0])) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ \`\`${args[0]}\`\` **nie jest liczbą!**`).setColor("Red")]});

    const time = args[0] * 1000;

    try {
        await queue.node.seek(time);
        return message.reply({embeds: [new EmbedBuilder().setTitle(`🎵 Pomyślnie ustawiono czas odtwarzania!`).setDescription(`**Przeskoczyłeś odtwarzanie muzyki o: \`\`${args[0]} sekund\`\`**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("Blue")]});
    } catch {
        return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Błąd podczas ustawiania czasu odtwarzania!**`).setColor("Red")]});
    };

};

exports.info = {
    name: "seek"
}