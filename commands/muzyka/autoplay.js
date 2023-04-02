'use strict';

const { EmbedBuilder } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

exports.run = async (client, message, args) => {

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue || !queue.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    switch(args[0]) {
        case 'on':
        try {
            if (queue.repeatMode === 3) return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Automatyczne odtwarzanie jest włączone!**").setColor("Red")]});
            if (queue.repeatMode === 0) await queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
            return message.reply({embeds: [new EmbedBuilder().setDescription("▶️ **Automatyczne odtwarzanie zostało włączone!**").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
        } catch {
            return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Nie mogę włączyć automatycznego odtwarzania!**").setColor("Red")]});
    };

    case 'off':
        try {
            if (queue.repeatMode === 0) return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Automatyczne odtwarzanie jest wyłączone!**").setColor("Red")]});
            if (queue.repeatMode === 3) await queue.setRepeatMode(QueueRepeatMode.OFF);
            return message.reply({embeds: [new EmbedBuilder().setDescription("▶️ **Automatyczne odtwarzanie zostało wyłączone!**").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
        } catch {
            return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Nie mogę włączyć automatycznego odtwarzania!**").setColor("Red")]});
        };
    };

};

exports.info = {
    name: "autoplay",
    aliases: ['ap']
};