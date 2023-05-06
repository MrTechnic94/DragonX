'use strict';

const embeds = require('../../utils/embeds.js');
const { QueueRepeatMode } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message, args) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue) return message.channel.send({embeds: [embeds.queue_error]});

    switch(args[0]?.toLowerCase()) {
        case 'off':
        if (queue.repeatMode === QueueRepeatMode.OFF) return message.channel.send({embeds: [embeds.loop_off_error]});
        if (queue.repeatMode !== QueueRepeatMode.OFF) queue.setRepeatMode(QueueRepeatMode.OFF);
        message.channel.send({embeds: [createEmbed({description: `🔒 **Pętla została zakończona!**`})]});
        break;
        
        case 'track':
        if (queue.repeatMode === QueueRepeatMode.TRACK) return message.channel.send({embeds: [embeds.loop_track_error]});
        if (queue.repeatMode === QueueRepeatMode.OFF) queue.setRepeatMode(QueueRepeatMode.TRACK);
        message.channel.send({embeds: [createEmbed({description: `🔂 **Powtarzanie piosenki zostało włączone!**`})]});
        break;

        case 'queue':
        if (queue.repeatMode === QueueRepeatMode.QUEUE) return message.channel.send({embeds: [embeds.loop_queue_error]});
        if (queue.repeatMode === QueueRepeatMode.OFF) queue.setRepeatMode(QueueRepeatMode.QUEUE);
        message.channel.send({embeds: [createEmbed({description: `🔁 **Powtarzanie playlisty zostało włączone!**`})]});
        break;
    };
};

exports.info = {
    name: "loop",
    aliases: ["lp", "repeat"],
    dj: true
};