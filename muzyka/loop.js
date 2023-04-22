'use strict';

const { EmbedBuilder } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    switch(args[0]) {
        case 'off':
        if (queue.repeatMode === QueueRepeatMode.OFF) return message.reply({embeds: [embeds.loop_off_error]});
        if (queue.repeatMode === QueueRepeatMode.TRACK || queue.repeatMode === QueueRepeatMode.QUEUE) await queue.setRepeatMode(QueueRepeatMode.OFF);
        message.reply({embeds: [new EmbedBuilder().setDescription("🔒 **Pętla została zakończona!**").setColor('Red')]});
        break;
        
    case 'track':
        if (queue.repeatMode === QueueRepeatMode.TRACK) return message.reply({embeds: [embeds.loop_track_error]});
        if (queue.repeatMode === QueueRepeatMode.OFF) await queue.setRepeatMode(QueueRepeatMode.TRACK);
        message.reply({embeds: [new EmbedBuilder().setDescription("🔂 **Powtarzanie piosenki zostało włączone!**").setColor('Red')]});
        break;

    case 'queue':
        if (queue.repeatMode === QueueRepeatMode.QUEUE) return message.reply({embeds: [embeds.loop_queue_error]});
        if (queue.repeatMode === QueueRepeatMode.OFF) await queue.setRepeatMode(QueueRepeatMode.QUEUE);
        message.reply({embeds: [new EmbedBuilder().setDescription("🔁 **Powtarzanie playlisty zostało włączone!**").setColor('Red')]});
        break;
    };
};

exports.info = {
    name: "loop",
    aliases: ['l'],
    dj: true
};