'use strict';

const { EmbedBuilder } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

exports.run = async (client, message, args) => {

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue || !queue.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    switch(args[0]) {
        case 'off':
    try {
        if (queue.repeatMode === 0) return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Powtarzanie jest wyłączone!**").setColor("Red")]});
        if (queue.repeatMode === 1 || queue.repeatMode === 2) await queue.setRepeatMode(QueueRepeatMode.OFF);
        return message.reply({embeds: [new EmbedBuilder().setDescription("🔒 **Pętla została zakończona!**").setColor("6b3deb").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})]});
    } catch {
        return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Nie mogę powtórzyć piosenki!**").setColor("Red")]});
    };

    case 'track':
    try {
        if (queue.repeatMode === 1) return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Powtarzanie piosenki jest już włączone!**").setColor("Red")]});
        if (queue.repeatMode === 0) await queue.setRepeatMode(QueueRepeatMode.TRACK);
        return message.reply({embeds: [new EmbedBuilder().setTitle("🔂 Powtarzanie piosenek").setDescription(`**Powtarzasz piosenkę:** \`\`${queue.currentTrack.title}\`\``).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
    } catch {
        return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Nie mogę powtórzyć piosenki!**").setColor("Red")]});
    };

    case 'queue':
    try {
        if (queue.repeatMode === 2) return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Powtarzanie kolejki jest już włączone!**").setColor("Red")]});
        if (queue.repeatMode === 0) await queue.setRepeatMode(QueueRepeatMode.QUEUE);
        return message.reply({embeds: [new EmbedBuilder().setTitle("🔁 Powtarzanie kolejki").setDescription(`**Powtarzanie kolejki zostało włączone!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
    } catch {
        return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Nie mogę powtórzyć piosenki!**").setColor("Red")]});
    }
};

};

exports.info = {
    name: "loop",
    aliases: ['l']
};