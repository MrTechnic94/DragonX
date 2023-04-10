'use strict';

const { MessageEmbed } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("RED")]});

    if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("RED")]});

    const embed = new MessageEmbed()
    .setTitle(`⚡ Teraz Odtwarzam:`)
    .setDescription(`**Tytuł:** ${queue.current.title}\n**Poziom głośności:** ${queue.volume}%\n**Na prośbę:** ${queue.current.requestedBy}\n\n${queue.createProgressBar({ timecode: false })} [\`\`${queue.current.duration}\`\`] 🔊`)
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setThumbnail(queue.current.thumbnail)
    .setColor("6b3deb")

    return message.reply({embeds: [embed]})

};

exports.info = {
    name: "nowplaying",
    aliases: ['np']
}