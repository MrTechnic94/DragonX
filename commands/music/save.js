'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');
const { useTimeline } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'save',
    aliases: ['grab', 'g'],
    dj: true,
    run: async (_client, message) => {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const timeline = useTimeline(message.guild.id);

        if (!timeline?.track) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        const requester = timeline.track.author === `cdn.discordapp.com` ? `brak` : timeline.track.author;

        return message.member.send({
            embeds: [
                createEmbed({
                    title: `📨 Zapisano piosenkę`,
                    description: `**Tytuł:** [${timeline.track.title}](${timeline.track.url})\n**Czas: \`${timeline.track.duration}\`**\n**Autor: \`${requester}\`**`,
                    thumbnail: timeline.track.thumbnail,
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