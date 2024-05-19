'use strict';

const { embedOptions } = require('../config/default');
const { EmbedBuilder } = require('discord.js');

// Utworzenie funkcji odpowiadajacej za generowanie embedu
function createEmbed({ url, title, image, timestamp, description, fields = {}, thumbnail, author = {}, footer = {}, color }) {
    const embed = new EmbedBuilder();

    // Ustawienia podczas tworzenia embedu
    if (url) embed.setURL(url);
    if (title) embed.setTitle(title);
    if (image) embed.setImage(image);
    if (timestamp) embed.setTimestamp(timestamp);
    if (description) embed.setDescription(description);
    if (fields.length > 0) embed.addFields(fields);
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (author.name ?? author.icon ?? author.url) embed.setAuthor({ name: author.name ?? undefined, iconURL: author.icon ?? undefined, url: author.url ?? undefined });
    if (footer.text ?? footer.icon) embed.setFooter({ text: footer.text ?? undefined, iconURL: footer.icon ?? undefined });
    embed.setColor(color ?? process.env.DEV_MODE === 'true' ? embedOptions.devEmbedColor : embedOptions.embedColor);

    return embed;
}

module.exports = { createEmbed };