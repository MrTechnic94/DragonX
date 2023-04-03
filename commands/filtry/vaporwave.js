'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {

    const queue = client.player.nodes.get(message.guild.id);
    
    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    switch(args[0]) {
        case 'on':
        try {
            if (queue.filters.ffmpeg.isEnabled('vaporwave')) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Ten lub inny filtr jest już aktywny!**`).setColor("Red")]});
            await queue.filters.ffmpeg.toggle(['vaporwave']);
            return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Vaporwave został włączony!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("Green")]});
        } catch {
            return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Nie mogę włączyć tego filtru!**").setColor("Red")]});
        };

    case 'off':
        try {
            if (!queue.filters.ffmpeg.isEnabled('vaporwave')) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Ten lub inny filtr nie jest aktywowany!**`).setColor("Red")]});
            await queue.filters.ffmpeg.setFilters(false);
            return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Vaporwave został wyłączony!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("Red")]});
        } catch {
            return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Nie mogę wyłączyć tego filtru!**").setColor("Red")]});
        }
    };

};

exports.info = {
    name: "vaporwave",
    aliases: ["vap"]
};