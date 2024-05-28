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
        const timeline = useTimeline(message.guild.id);

        if (!timeline?.track) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        const requester = timeline.track.author === 'cdn.discordapp.com' ? 'brak' : timeline.track.author;

        try {
            await message.member.send({
                embeds: [
                    createEmbed({
                        title: '📨 Zapisano piosenkę',
                        description: `**Tytuł: [\`${timeline.track.cleanTitle}\`](${timeline.track.url})**\n**Autor: \`${requester}\`**\n**Czas: \`${timeline.track.duration}\`**`,
                        thumbnail: timeline.track.thumbnail,
                        footer: {
                            text: message.guild.name,
                            icon: message.guild.iconURL()
                        }
                    })]
            });
            return message.channel.send({ embeds: [messageEmbeds.send_dm_success] });
        } catch {
            return message.channel.send({ embeds: [messageEmbeds.send_dm_error] });
        }
    },
};