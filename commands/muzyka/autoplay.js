'use strict';

const { MessageEmbed } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

exports.run = async (client, message, args) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("RED")]});

    if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("RED")]});

    if (args[0] === 'on') {
        try {
            if (queue.repeatMode === 3) return message.reply({embeds: [new MessageEmbed().setDescription("❌ **Automatyczne odtwarzanie jest włączone!**").setColor("RED")]});
            if (queue.repeatMode === 0) await queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
            message.reply({embeds: [new MessageEmbed().setDescription("▶️ **Automatyczne odtwarzanie zostało włączone!**").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
        } catch (error) {
            return message.reply({embeds: [new MessageEmbed().setDescription("❌ **Nie mogę włączyć automatycznego odtwarzania!**").setColor("RED")]});
        }
    };

    if (args[0] === 'off') {
        try {
            if (queue.repeatMode === 0) return message.reply({embeds: [new MessageEmbed().setDescription("❌ **Automatyczne odtwarzanie jest wyłączone!**").setColor("RED")]});
            if (queue.repeatMode === 3) await queue.setRepeatMode(QueueRepeatMode.OFF);
            message.reply({embeds: [new MessageEmbed().setDescription("▶️ **Automatyczne odtwarzanie zostało wyłączone!**").setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
        } catch (error) {
            return message.reply({embeds: [new MessageEmbed().setDescription("❌ **Nie mogę włączyć automatycznego odtwarzania!**").setColor("RED")]});
        }
    };

};

exports.info = {
    name: "autoplay"
}