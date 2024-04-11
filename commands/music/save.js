'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');
const { useQueue } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'save',
    aliases: ['grab', 'g'],
    dj: true,
    run: async (_client, message) => {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        const requester = queue.currentTrack.author === `cdn.discordapp.com` ? `nieznany` : queue.currentTrack.author;

        return message.member.send({
            embeds: [
                createEmbed({
                    title: `📨 Zapisano piosenkę`,
                    description: `**Tytuł:** [${queue.currentTrack.title}](${queue.currentTrack.url})\n**Czas:** ${queue.currentTrack.duration}\n**Autor:** ${requester}`,
                    thumbnail: queue.currentTrack.thumbnail,
                    footer: {
                        text: message.guild.name,
                        icon: message.guild.iconURL()
                    }
                })]
        }).then(() => {
            return message.channel.send({ embeds: [messageEmbeds.send_dm_success] });
        }).catch(() => {
            return message.channel.send({ embeds: [messageEmbeds.send_dm_error] });
        });
    }
};