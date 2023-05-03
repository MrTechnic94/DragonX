'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    const queue = client.player.nodes.get(message.guild.id);

    if (!queue) return message.reply({embeds: [embeds.queue_error]});

    const tracks = queue.tracks.map((track, i) => `**${i + 1}.** [${track.title}](${track.url}) [${track.duration}]`);
    const songs = queue.tracks.size;
    const nextSongs = songs > 20 ? `${songs - 20} piosenki` : `w playliście ${songs} piosenka(i)`;

    const embed = createEmbed({
        title: '📰 Piosenki w playliście',
        description: `**Teraz odtwarzam:**\n[${queue.currentTrack.title}](${queue.currentTrack.url}) [${queue.currentTrack.duration}]\n\n**Następne:**\nBrak piosenek`,
    });
    
    if (queue.tracks.at(0)) {
        embed.setDescription(`**Teraz odtwarzam:**\n[${queue.currentTrack.title}](${queue.currentTrack.url}) [${queue.currentTrack.duration}]\n\n**Następne:**\n${tracks.slice(0, 20).join('\n')}`)
        embed.setFooter({text: nextSongs})
    };

    return message.reply({embeds: [embed]});
};

exports.info = {
    name: "queue",
    aliases: ["q", "list", "playlist"]
};