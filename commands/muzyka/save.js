'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return await message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    const embed = new EmbedBuilder()
    .setTitle('📨 Zapisano Piosenkę!')
    .setDescription(`**Tytuł:** [${queue.current.title}](${queue.current.url})\n**Czas:** ${queue.current.duration}\n**Autor:** ${queue.current.author}`)
    .setThumbnail(queue.current.thumbnail)
    .setColor('Red')

    return message.member.send({ embeds: [embed] }).then(() => {
        return message.reply({embeds: [new EmbedBuilder().setDescription(`✅ **Sprawdź wiadomości prywatne!**`).setColor("Green")]});
    }).catch(error => {
        return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie mogę wysłać do ciebie wiadomości prywatnej!**`).setColor("Red")]});
    });

};

exports.info = {
    name: "save"
}