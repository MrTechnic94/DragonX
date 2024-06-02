'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'save',
    aliases: ['grab', 'g'],
    dj: true,
    cooldown: 2,
    async run(_client, message) {
        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        const requester = queue.currentTrack.author === 'cdn.discordapp.com' ? 'brak' : queue.currentTrack.author;

        try {
            await message.member.send({
                embeds: [
                    createEmbed({
                        title: '📨 Zapisano piosenkę',
                        description: `**Tytuł: [\`${queue.currentTrack.cleanTitle}\`](${queue.currentTrack.url})**\n**Autor: \`${requester}\`**\n**Czas: \`${queue.currentTrack.duration}\`**`,
                        thumbnail: queue.currentTrack.thumbnail,
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