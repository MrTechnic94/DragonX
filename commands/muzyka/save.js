'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.channel.send({embeds: [embeds.queue_error]});

    const requester = queue.currentTrack.author === `cdn.discordapp.com` ? `nieznany` : queue.currentTrack.author;

    return message.member.send({
        embeds: [createEmbed({
            title: `📨 Zapisano piosenkę!`,
            description: `**Tytuł:** [${queue.currentTrack.title}](${queue.currentTrack.url})\n**Czas:** ${queue.currentTrack.duration}\n**Autor:** ${requester}`,
            thumbnail: queue.currentTrack.thumbnail
        })]
    }).then(() => {
        return message.channel.send({embeds: [embeds.send_dm_succes]});
    }).catch(() => {
        return message.channel.send({embeds: [embeds.send_dm_error]});
    });
};

exports.info = {
    name: "save",
    aliases: ["sv", "grab", "g"]
};