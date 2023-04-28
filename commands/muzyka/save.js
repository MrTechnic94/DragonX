'use strict';

const { EmbedBuilder } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    const requester = queue.currentTrack.author === `cdn.discordapp.com` ? `nieznany` : queue.currentTrack.author;

    return message.member.send({
        embeds: [
            new EmbedBuilder()
                .setTitle(`📨 Zapisano piosenkę!`)
                .setDescription(`**Tytuł:** [${queue.currentTrack.title}](${queue.currentTrack.url})\n**Czas:** ${queue.currentTrack.duration}\n**Autor:** ${requester}`)
                .setThumbnail(queue.currentTrack.thumbnail)
                .setColor('Red')]
    }).then(() => {
        return message.reply({embeds: [new EmbedBuilder().setDescription(`✅ **Sprawdź wiadomości prywatne!**`).setColor('Red')]});
    }).catch(() => {
        return message.reply({embeds: [embeds.send_dm_error]});
    });
};

exports.info = {
    name: "save",
    aliases: ["sa"]
};