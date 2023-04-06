'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    switch(args[0]) {
        case 'on':
            if (queue.filters.ffmpeg.isEnabled('bassboost_low')) return message.reply({ embeds: [new EmbedBuilder().setDescription(`❌ **Ten filtr jest już aktywowany!**`).setColor("Red")] });
            await queue.filters.ffmpeg.toggle(['bassboost_low', 'normalizer2']);
            return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Niski Bassboost został włączony!**`).setFooter({ text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setColor("Green")]});

    case 'off':
            if (!queue.filters.ffmpeg.isEnabled('bassboost_low')) return message.reply({ embeds: [new EmbedBuilder().setDescription(`❌ **Ten inny filtr nie jest aktywowany!**`).setColor("Red")] });
            await queue.filters.ffmpeg.setFilters(false);
            return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Niski Bassboost został wyłączony!**`).setFooter({ text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setColor("Red")]});
    };

};

exports.info = {
    name: "bassboostlow",
    aliases: ["bsl"]
};