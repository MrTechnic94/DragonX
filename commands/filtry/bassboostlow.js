'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue || !queue.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return await message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    if (args[0] === 'on') {
        try {
            if (queue.filters.ffmpeg.isEnabled('bassboost_low')) return message.reply({ embeds: [new EmbedBuilder().setDescription(`❌ **Ten lub inny filtr jest już aktywny!**`).setColor("Red")] });
            await queue.filters.ffmpeg.toggle(['bassboost_low', 'normalizer2']);

            return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Niski Bassboost został włączony!**`).setFooter({ text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setColor("Green")]});
        } catch {
            return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Nie mogę włączyć tego filtru!**").setColor("Red")]});
        };

    } else if (args[0] === 'off') {
        try {
            if (!queue.filters.ffmpeg.isEnabled('bassboost_low')) return message.reply({ embeds: [new EmbedBuilder().setDescription(`❌ **Ten lub inny filtr nie jest aktywowany!**`).setColor("Red")] });
            await queue.filters.ffmpeg.setFilters(false);
            
            return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Niski Bassboost został wyłączony!**`).setFooter({ text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setColor("Red")]});
        } catch {
            return message.reply({embeds: [new EmbedBuilder().setDescription("❌ **Nie mogę wyłączyć tego filtru!**").setColor("Red")]});
        }
    };

};

exports.info = {
    name: "bassboostlow",
    aliases: ["bsl"]
}