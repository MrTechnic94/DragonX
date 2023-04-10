'use strict';

const { MessageEmbed } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

exports.run = async (client, message, args) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("RED")]});

    if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("RED")]});

    if (args[0] === 'off') {
    try {
        if (queue.repeatMode === 0) return message.reply({embeds: [new MessageEmbed().setDescription("❌ **Automatyczne odtwarzanie jest wyłączone!**").setColor("RED")]});
        if (queue.repeatMode === 1 || queue.repeatMode === 2) await queue.setRepeatMode(QueueRepeatMode.OFF);
        message.reply({embeds: [new MessageEmbed().setDescription("🔒 **Pętla została zakończona!**").setColor("6b3deb").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})]});
    } catch (error) {
        return message.reply({embeds: [new MessageEmbed().setTitle("❌ Nie mogę powtórzyć piosenki!").setColor("RED")]});
        }
    }

    if (args[0] === 'track') {
    try {
        if (queue.repeatMode === 1) return message.reply({embeds: [new MessageEmbed().setDescription("❌ **Powtarzanie piosenki jest już włączone!**").setColor("RED")]});
        if (queue.repeatMode === 0) await queue.setRepeatMode(QueueRepeatMode.TRACK);
        message.reply({embeds: [new MessageEmbed().setTitle("🔂 Powtarzanie piosenek").setDescription(`**Powtarzasz piosenkę:** \`\`${queue.current.title}\`\``).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
    } catch (error) {
        return message.reply({embeds: [new MessageEmbed().setTitle("❌ Nie mogę powtórzyć piosenki!").setColor("RED")]});
        }
    }

    if (args[0] === 'queue') {
    try {
        if (queue.repeatMode === 2) return message.reply({embeds: [new MessageEmbed().setDescription("❌ **Powtarzanie kolejki jest już włączone!**").setColor("RED")]});
        if (queue.repeatMode === 0) await queue.setRepeatMode(QueueRepeatMode.QUEUE);
        message.reply({embeds: [new MessageEmbed().setTitle("🔁 Powtarzanie kolejki").setDescription(`**Powtarzanie kolejki zostało włączone!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
    } catch (error) {
        return message.reply({embeds: [new MessageEmbed().setTitle("❌ Nie mogę powtórzyć piosenki!").setColor("RED")]});
    }
}

    // try {
    //     queue.setRepeatMode(QueueRepeatMode.TRACK);
    //     return message.reply({embeds: [new MessageEmbed().setTitle("🔂 Powtarzanie piosenek").setDescription(`**Powtarzasz piosenkę:** \`\`${queue.current.title}\`\``).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
    // } catch (error) {
    //     return message.reply({embeds: [new MessageEmbed().setTitle("❌ Nie mogę powtórzyć piosenki!").setColor("RED")]});
    // }
};

exports.info = {
    name: "loop"
}