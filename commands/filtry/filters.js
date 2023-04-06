'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setTitle('📰 Lista filtrów').setDescription(`🔴 **BassBoostLow**\n🔴 **BassBoost**\n🔴 **BassBoostHigh**\n🔴 **Karaoke**\n🔴 **Nightcore**\n🔴 **Lofi**`).setFooter({text: `Użycie: bassboost <on / off>`}).setColor("6b3deb")]});

    // if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});
    
    const bsl = queue.filters.ffmpeg.isEnabled('bassboost_low') ? `🟢 **BassBoostLow**` : `🔴 **BassBoostLow**`;
    const bs = queue.filters.ffmpeg.isEnabled('bassboost') ? `🟢 **BassBoost**` : `🔴 **BassBoost**`;
    const bsh = queue.filters.ffmpeg.isEnabled('bassboost_high') ? `🟢 **BassBoostHigh**` : `🔴 **BassBoostHigh**`;
    const kar = queue.filters.ffmpeg.isEnabled('karaoke') ? `🟢 **Karaoke**` : `🔴 **Karaoke**`;
    const nc = queue.filters.ffmpeg.isEnabled('nightcore') ? `🟢 **Nightcore**` : `🔴 **Nightcore**`;
    const vap = queue.filters.ffmpeg.isEnabled('vaporwave') ? `🟢 **Vaporwave**` : `🔴 **Vaporwave**`;
    const lf = queue.filters.ffmpeg.isEnabled('lofi') ? `🟢 **Lofi**` : `🔴 **Lofi**`;

    const embed = new EmbedBuilder()
    .setTitle('📰 Lista filtrów')
    .setDescription(`${bsl}\n${bs}\n${bsh}\n${kar}\n${nc}\n${vap}\n${lf}`)
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor('6b3deb')

    return message.reply({embeds: [embed]});

};

exports.info = {
    name: "filters",
    aliases: ["f"]
};