'use strict';

const { EmbedBuilder } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

exports.run = async (client, message, args) => {

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    switch(args[0]) {
        case 'on':
            if (queue.repeatMode === QueueRepeatMode.AUTOPLAY) return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Automatyczne odtwarzanie jest włączone!**").setColor("Red")]});
            if (queue.repeatMode === QueueRepeatMode.OFF) await queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
            return message.reply({embeds: [new EmbedBuilder().setDescription("▶️ **Automatyczne odtwarzanie zostało włączone!**").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});

    case 'off':
            if (queue.repeatMode === QueueRepeatMode.OFF) return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Automatyczne odtwarzanie jest wyłączone!**").setColor("Red")]});
            if (queue.repeatMode === QueueRepeatMode.AUTOPLAY) await queue.setRepeatMode(QueueRepeatMode.OFF);
            return message.reply({embeds: [new EmbedBuilder().setDescription("▶️ **Automatyczne odtwarzanie zostało wyłączone!**").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
    };

};

exports.info = {
    name: "autoplay",
    aliases: ['ap']
};