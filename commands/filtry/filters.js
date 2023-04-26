'use strict';

const { EmbedBuilder } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});
    
    switch(args[0]?.toLowerCase()) {
        case 'reset':
            await queue.filters.ffmpeg.setFilters(false);
            return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Wszystkie filtry zostały wyłączone!**`).setColor('Red')]});
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
    .setFooter({text: `Użycie: '${process.env.PREFIX}bassboost'`})
    .setColor('Red')

    return message.reply({embeds: [embed]});
};

exports.info = {
    name: "filters",
    aliases: ["f"],
    dj: true
};