'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    try {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [embeds.voice_error] });

        const queue = client.player.nodes.get(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [embeds.queue_error] });

        const index = parseInt(args[0]);
        const indexTrack = parseInt(args[1]);
        const track = queue.tracks.at(index - 1);

        if (!index || !indexTrack || !track || index < 0 || indexTrack < 0 || index > queue.getSize() || indexTrack > queue.getSize()) return message.channel.send({ embeds: [embeds.number_error] });

        const remove = queue.node.remove(index - 1);

        queue.insertTrack(remove, indexTrack - 1);
        return message.channel.send({ embeds: [createEmbed({ description: `▶️ **Przeniesiono utwór na pozycję ${args[1]}!**` })] });
    } catch {
        return message.channel.send({ embeds: [embeds.catch_error] })
    };
};

exports.info = {
    name: "move",
    aliases: ["mv", "insert"],
    dj: true
};