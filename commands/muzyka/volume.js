const { MessageEmbed } = require('discord.js');
const { Player } = require('discord-player');

exports.run = async (client, message, args) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Nie ma żadnej puszczonej piosenki, więc nie zmienie głośności!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    const vol = parseInt(args[0]);

    if (vol < 0 || vol > 100) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Zakres głośności musi wynosić 0-100!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    if (queue.volume === vol) return message.reply({embeds:[new MessageEmbed().setDescription(`🔊 **Ustawiono głośnośc na: ${vol}!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("BLUE")]});
    const success = await queue.setVolume(vol);

    return message.reply({embeds:[new MessageEmbed().setDescription(`🔊 **Ustawiono głośnośc na: ${vol}!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("BLUE")]});

};

exports.info = {
    name: "volume"
}