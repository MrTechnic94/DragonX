'use strict';

const { EmbedBuilder } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

exports.run = async (client, message, args) => {

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    switch(args[0]) {
        case 'off':
        if (queue.repeatMode === QueueRepeatMode.OFF) return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Powtarzanie jest wyłączone!**").setColor("Red")]});
        if (queue.repeatMode === QueueRepeatMode.TRACK || queue.repeatMode === QueueRepeatMode.QUEUE) await queue.setRepeatMode(QueueRepeatMode.OFF);
        return message.reply({embeds: [new EmbedBuilder().setDescription("🔒 **Pętla została zakończona!**").setColor("6b3deb").setFooter({text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})]});

    case 'track':
        if (queue.repeatMode === QueueRepeatMode.TRACK) return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Powtarzanie piosenki jest już włączone!**").setColor("Red")]});
        if (queue.repeatMode === QueueRepeatMode.OFF) await queue.setRepeatMode(QueueRepeatMode.TRACK);
        return message.reply({embeds: [new EmbedBuilder().setDescription("🔂 **Powtarzanie piosenki zostało włączone!**").setFooter({text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});

    case 'queue':
        if (queue.repeatMode === QueueRepeatMode.QUEUE) return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Powtarzanie kolejki jest już włączone!**").setColor("Red")]});
        if (queue.repeatMode === QueueRepeatMode.OFF) await queue.setRepeatMode(QueueRepeatMode.QUEUE);
        return message.reply({embeds: [new EmbedBuilder().setDescription("🔁 **Powtarzanie kolejki zostało włączone!**").setFooter({text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
};

};

exports.info = {
    name: "loop",
    aliases: ['l']
};