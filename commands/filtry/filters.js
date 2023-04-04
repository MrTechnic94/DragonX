'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {

    const queue = client.player.nodes.get(message.guild.id);

    const efilter = queue.filters.ffmpeg.getFiltersEnabled();

    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    if (args[0] === 'status') return message.reply({embeds: [new EmbedBuilder().setTitle('⚡ Aktywne filtry').setDescription(`${efilter.join('\n')}`).setColor("Red")]});

    else if (args[0] === 'list') return message.reply({embeds: [new EmbedBuilder().setTitle('📰 Lista filtrów').setDescription(``).setColor("Gold")]});

    else if (args[0] === 'on' /* do zmiany*/) {

    }

    else if (args[0] === 'off') {
        try {
            if (!queue.filters.ffmpeg.isEnabled()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Żaden filtr nie jest aktywowany!**`).setColor("Red")]});
            await queue.filters.ffmpeg.setFilters(false);
            return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Filter ${nazaw } został wyłączony!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("Red")]});
        } catch {
            return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Nie mogę wyłączyć filtru!**").setColor("Red")]});
    }
};

};

exports.info = {
    name: "filters",
    aliases: ["f"]
};