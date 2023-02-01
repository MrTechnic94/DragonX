'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {

    const queue = client.player.getQueue(message.guild.id);
    let enabledFilter = await queue.getFiltersEnabled();

    if (!queue || !queue.playing) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return await message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    if (args[0] === 'on') {
        if (enabledFilter.length > 0) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Ten filtr jest już aktywny!**`).setColor("Red")]});
        await queue.setFilters({
            bassboost_low: true,
            normalizer2: true
        });

        return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Niski Bassboost został włączony!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("Green")]});
    };

    if (args[0] === 'off') {
        if (enabledFilter.length == 0) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Żaden filtr nie jest aktywowany!**`).setColor("Red")]});
        await queue.setFilters({
            bassboost_low: false,
            normalizer2: false
        });
        return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Niski Bassboost został wyłączony!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("Red")]});
    };

};

exports.info = {
    name: "bassboostlow",
    aliases: ["bsl"]
}