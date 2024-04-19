'use strict';

const redis = require('../../utils/redis.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    run: async (_client, message) => {
        const guildData = await redis.hgetall(message.guild.id);
        const prefix = guildData?.prefix ?? process.env.PREFIX;
        const totalPages = 2;
        let currentPage = 0;

        const commands = {
            music: [
                { name: 'Leave', description: 'Bot wychodzi z kanału' },
                { name: 'Volume [liczba]', description: 'Zmienia głośność' },
                { name: 'Clear', description: 'Usuwa aktualną playlistę' },
                { name: 'Play <tytuł lub link>', description: 'Odtwarza wybraną piosenkę' },
                { name: 'Loop [off | track | queue]', description: 'Włącza lub wyłącza powtarzanie' },
                { name: 'Skip', description: 'Rozpoczyna głosowanie na pominięcie piosenki' },
                { name: 'Forceskip', description: 'Pomija aktualną piosenkę' },
                { name: 'Nowplaying', description: 'Informacje o obecnym utworze' },
                { name: 'Pause', description: 'Zatrzymuje odtwarzanie piosenki' },
                { name: 'Resume', description: 'Wznawia zatrzymaną piosenkę' },
                { name: 'Shuffle', description: 'Przetasowuje bieżącą playlistę' },
                { name: 'Queue', description: 'Wyświetla listę piosenek w playliście' },
                { name: 'Seek <format HH:MM:SS>', description: 'Zmienia pozycję odtwarzania' },
                { name: 'Back', description: 'Odtwarza poprzednią piosenkę' },
                { name: 'Filters [clear]', description: 'Wyświetla listę dostępnych filtrów lub je wyłącza' },
                { name: 'Autoplay', description: 'Przełącza automatyczne odtwarzanie' },
                { name: 'Save', description: 'Wysyła w prywatnej wiadomości bieżącą piosenkę' },
                { name: 'Remove <liczba>', description: 'Pozwala usunąć z playlisty wybraną piosenkę' },
                { name: 'Jump <liczba>', description: 'Pozwala przeskoczyć odtwarzanie na wybraną piosenkę' },
                { name: 'Move <liczba, liczba>', description: 'Przenosi piosenkę do wybranego miejsca' },
                { name: 'Lyrics [tytuł]', description: 'Wyświetla tekst do aktualnej lub wybranej piosenki' },
                { name: 'Replay', description: 'Dodaje na początek playlisty aktualnie odtwarzaną piosenkę' }
            ],
            general: [
                { name: 'Debug', description: 'Pokazuje informacje o bocie' },
                { name: 'Ping', description: 'Wyświetla aktualny ping bota' },
                { name: 'Prefix <prefix>', description: 'Pozwala zmienić prefix na serwerze' },
                { name: 'Prefix <clear>', description: 'Ustawia domyślny prefix na serwerze' },
                { name: 'Dj <rola>', description: 'Ustawia rolę DJ na serwerze' },
                { name: 'Dj <remove>', description: 'Usuwa ustawioną rolę DJ' },
                { name: 'Settings', description: 'Aktualne ustawienia dla serwera' }
            ]
        };

        const embeds = [
            createEmbed({
                title: '🎵 Komendy muzyczne',
                description: commands.music.map(command => `\`${prefix}${command.name}\` - **${command.description}**`).join('\n'),
                footer: {
                    text: `Strona ${currentPage + 1}/${totalPages}`
                }
            }),
            createEmbed({
                title: '❓ Komendy ogólne',
                description: commands.general.map(command => `\`${prefix}${command.name}\` - **${command.description}**`).join('\n')
            })
        ];

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
            if (currentPage > 0) row.addComponents(backwardButton);
            if (currentPage < totalPages - 1) row.addComponents(forwardButton);
        };

        const msg = await message.channel.send({ embeds: [embeds[currentPage]], components: [row] });

        const filter = interaction => interaction.user.id === message.author.id;

        const collector = msg.createMessageComponentCollector({ filter, time: 120000 });

        collector.on('collect', async interaction => {
            if (interaction.customId === 'backward' && currentPage > 0) {
                currentPage--;
            } else if (interaction.customId === 'forward' && currentPage < totalPages - 1) {
                currentPage++;
            }

            row.components = [];

            if (currentPage > 0) row.addComponents(backwardButton);
            if (currentPage < totalPages - 1) row.addComponents(forwardButton);

            updateEmbed();
            await interaction.update({ embeds: [embeds[currentPage]], components: [row] });
        });

        collector.on('end', () => {
            msg.edit({ components: [] });
        });

        function updateEmbed() {
            embeds[currentPage].setFooter({ text: `Strona ${currentPage + 1}/${totalPages}` });
        };
    }
};