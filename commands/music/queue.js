'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q', 'list', 'playlist'],
    cooldown: 2,
    async run(_client, message) {
        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        let page = 0;

        const totalPages = Math.max(Math.ceil(queue.tracks.size / 20), 1);

        const tracks = queue.tracks.map((track, i) => `**${i + 1}.** [${track.title}](${track.url}) [${track.duration}]`);

        let footerText = `Strona ${page + 1}/${totalPages}`;

        if (queue.tracks.size > 0) footerText += ` • ${queue.tracks.size.toString()} ${queue.tracks.size < 2 ? `piosenka` : `piosenki`}`;

        const embed = createEmbed({
            title: '📰 Piosenki w playliście',
            description: `**Teraz odtwarzam:**\n[${queue.currentTrack.title}](${queue.currentTrack.url}) [${queue.currentTrack.duration}]\n\n**Następne:**\n${queue.tracks.size === 0 ? `Brak piosenek` : tracks.slice(page * 20, (page + 1) * 20).join('\n')}`,
            footer: {
                text: footerText
            }
        });

        if (queue.tracks.size <= 20) return message.channel.send({ embeds: [embed] });

        const backwardButton = new ButtonBuilder()
            .setCustomId('backward')
            .setLabel('◀️')
            .setStyle(ButtonStyle.Primary);

        const forwardButton = new ButtonBuilder()
            .setCustomId('forward')
            .setLabel('▶️')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder();

        if (totalPages > 1) {
            if (page > 0) row.addComponents(backwardButton);
            if (page < totalPages - 1) row.addComponents(forwardButton);
        };

        const msg = await message.channel.send({ embeds: [embed], components: [row] });

        const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = msg.createMessageComponentCollector({ filter, time: 120000 });

        collector.on('collect', async (interaction) => {
            if (interaction.customId === 'backward' && page > 0) {
                page--;
            } else if (interaction.customId === 'forward' && page < totalPages - 1) {
                page++;
            };
            updateEmbed();
            await interaction.update({ embeds: [embed], components: [row] });
        });

        collector.on('end', () => {
            msg.edit({ components: [] });
        });

        function updateButtons() {
            row.components = [];
            if (page > 0) row.addComponents(backwardButton);
            if (page < totalPages - 1) row.addComponents(forwardButton);
        };

        function updateEmbed() {
            embed.setDescription(`**Teraz odtwarzam:**\n[${queue.currentTrack.title}](${queue.currentTrack.url}) [${queue.currentTrack.duration}]\n\n**Następne:**\n${tracks.slice(page * 20, (page + 1) * 20).join('\n')}`);
            embed.setFooter({ text: `Strona ${page + 1}/${totalPages} • ${queue.tracks.size} piosenki` });
            updateButtons();
        };
    }
};