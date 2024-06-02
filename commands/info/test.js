'use strict';

const logger = require('../../utils/consoleLogger');
const { createEmbed } = require('../../utils/embedCreator');

module.exports = {
    name: 'test',
    cooldown: 2,
    async run(client, message) {
        const embedData = {
            url: 'https://example.com',
            title: 'Przykładowy Tytuł',
            image: 'https://example.com/image.png',
            timestamp: Date.now(),
            description: 'To jest przykładowy opis embedu.',
            fields: [
                { value: 'Wartość pola 1', inline: true },
                { name: 'Pole 2', value: 'Wartość pola 2', inline: true }
            ],
            thumbnail: 'https://example.com/thumbnail.png',
            author: {
                name: 'Autor',
            },
            footer: {
                icon: 'https://example.com/footer-icon.png'
            },
            color: 0xfef65b
        };

        // Utworzenie embedu
        const embed = createEmbed(embedData);
        message.channel.send({ embeds: [embed] });
        logger.info(embed)
    },
};