'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');
const { useQueue } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'queue',
    aliases: ['q', 'list', 'playlist'],
    run: async (_client, message) => {
        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        const embed = createEmbed({
            title: '📰 Piosenki w playliście',
            description: `**Teraz odtwarzam:**\n[${queue.currentTrack.title}](${queue.currentTrack.url}) [${queue.currentTrack.duration}]\n\n**Następne:**\nBrak piosenek`
        });

        if (queue.tracks.at(0)) {
            const tracks = queue.tracks.map((track, i) => `**${i + 1}.** [${track.title}](${track.url}) [${track.duration}]`);
            const songs = queue.tracks.size;
            const nextSongs = songs > 20 ? `${songs - 20} piosenki` : `w playliście ${songs} piosenka(i)`;

            embed.setDescription(`**Teraz odtwarzam:**\n[${queue.currentTrack.title}](${queue.currentTrack.url}) [${queue.currentTrack.duration}]\n\n**Następne:**\n${tracks.slice(0, 20).join('\n')}`)
            embed.setFooter({ text: nextSongs })
        };

        return message.channel.send({ embeds: [embed] });
    }
};