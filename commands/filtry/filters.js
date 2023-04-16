'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setTitle('📰 Lista filtrów').setDescription(`🔴 **BassBoostLow**\n🔴 **BassBoost**\n🔴 **BassBoostHigh**\n🔴 **Karaoke**\n🔴 **Nightcore**\n🔴 **Lofi**\n🔴 **Compressor**\n🔴 **Reverse**`).setFooter({text: `Użycie: ${process.env.PREFIX}bassboost`}).setColor("6b3deb")]});
    
    switch(args[0]) {
        case 'reset':
            await queue.filters.ffmpeg.setFilters(false);
            return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Wszystkie filtry zostały wyłączone!**`).setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor('Green')]});
    };

    const filters = [
        { name: 'bassboost_low', label: 'BassBoostLow' },
        { name: 'bassboost', label: 'BassBoost' },
        { name: 'bassboost_high', label: 'BassBoostHigh' },
        { name: 'karaoke', label: 'Karaoke' },
        { name: 'nightcore', label: 'Nightcore' },
        { name: 'vaporwave', label: 'Vaporwave' },
        { name: 'lofi', label: 'Lofi' },
        { name: 'compressor', label: 'Compressor' },
        { name: 'reverse', label: 'Reverse' }
    ];

    const embedFields = [];

    for (const filter of filters) {
        const isEnabled = queue.filters.ffmpeg.isEnabled(filter.name);
        const status = isEnabled ? '🟢' : '🔴';
        embedFields.push(`${status} **${filter.label}**`);
    };

    const embed = new EmbedBuilder()
    .setTitle('📰 Lista filtrów')
    .setDescription(embedFields.join('\n'))
    .setFooter({text: `Użycie: ${process.env.PREFIX}bassboost`})
    .setColor('6b3deb')

    return message.reply({embeds: [embed]});
};

exports.info = {
    name: "filters",
    aliases: ["f"],
    dj: true
};