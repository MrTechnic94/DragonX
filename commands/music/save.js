'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useTimeline } = require('discord-player');

module.exports = {
    name: 'save',
    aliases: ['grab', 'g'],
    dj: true,
    cooldown: 2,
    async run(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const timeline = useTimeline(message.guild.id);

        if (!timeline?.track) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        const requester = timeline.track.author === 'cdn.discordapp.com' ? 'brak' : timeline.track.author;

        return message.member.send({
            embeds: [
                createEmbed({
                    title: '📨 Zapisano piosenkę',
                    description: `**Tytuł: [\`${timeline.track.cleanTitle}\`](${timeline.track.url})**\n**Czas: \`${timeline.track.duration}\`**\n**Autor: \`${requester}\`**`,
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
    },
};