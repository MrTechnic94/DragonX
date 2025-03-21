'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    const requester = queue.currentTrack.author === `cdn.discordapp.com` ? `nieznany` : queue.currentTrack.author;

    const embed = new EmbedBuilder()
    .setTitle('📨 Zapisano Piosenkę!')
    .setDescription(`**Tytuł:** [${queue.currentTrack.title}](${queue.currentTrack.url})\n**Czas:** ${queue.currentTrack.duration}\n**Autor:** ${requester}`)
    .setThumbnail(queue.currentTrack.thumbnail)
    .setColor('Red')

    return message.member.send({embeds: [embed]}).then(() => {
        return message.reply({embeds: [new EmbedBuilder().setDescription(`✅ **Sprawdź wiadomości prywatne!**`).setColor("Green")]});
    }).catch(() => {
        return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie mogę wysłać do ciebie wiadomości prywatnej!**`).setColor("Red")]});
    });

};

exports.info = {
    name: "save",
    aliases: ['s']
};