'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const { embeds } = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [embeds.voice_error] });

    const queue = client.player.nodes.get(message.guild.id);
    const vol = parseInt(args[0]);

    if (!queue?.isPlaying()) return message.channel.send({ embeds: [embeds.queue_error] });

    if (isNaN(vol)) return message.channel.send({ embeds: [createEmbed({ description: `🔊 **Aktualna głośność: ${queue.node.volume}%**` })] });

    if (vol < 0 || vol > 200) return message.channel.send({ embeds: [embeds.max_volume_error] });

    if (queue.node.volume === vol) return message.channel.send({ embeds: [embeds.already_volume_error] });

    if (vol === 0) {
        queue.node.setVolume(0);
        queue.node.pause();
    } else {
        queue.node.resume();
    };

    queue.node.setVolume(vol);
    return message.channel.send({ embeds: [createEmbed({ description: `🔊 **Ustawiono głośność na: ${vol}%**` })] });
};

exports.info = {
    name: "volume",
    aliases: ["v", "vol"],
    dj: true
};