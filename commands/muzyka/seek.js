'use strict'

const { MessageEmbed } = require('discord.js');
const { Player } = require('discord-player');

exports.run = async (client, message, args) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    if (args[0] * 1000 >= queue.current.durationMS) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Podana pozycja jest większa od długości utworu, lub równa!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    if (args[0] <= 0) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Nieprawidłowa liczba!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    if (args[0] === undefined) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Nieprawidłowa liczba!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    if (isNaN(args[0])) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ \`\`${args[0]}\`\` **nie jest liczbą!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    const time = args[0] * 1000;

    await queue.seek(time);

    return message.reply({embeds: [new MessageEmbed().setTitle(`🎵 Pomyślnie ustawiono czas odtwarzania!`).setDescription(`**Przeskoczyłeś odtwarzanie muzyki do: \`\`${args[0]} sekund\`\`**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("BLUE")]});

}

exports.info = {
    name: "seek"
}