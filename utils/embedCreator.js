'use strict';

const { EmbedBuilder } = require('discord.js');

function createEmbed({title, description, fields = [], thumbnail, footer = {}}) {
    const embed = new EmbedBuilder()
        .setColor('#ED4245')

    // Ustawienia podczas tworzenia embedu    
    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (fields.length > 0) embed.addFields(fields);
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (footer.text ?? footer.icon) embed.setFooter({text: footer.text ?? undefined, iconURL: footer.icon ?? undefined});

    return embed;
};

module.exports = { createEmbed };