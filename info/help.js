'use strict';

const { EmbedBuilder } = require('discord.js');
const GuildSettings = require('../../utils/guildSettings.js');

exports.run = async (_client, message, args) => {
    // const embed = new EmbedBuilder()
    // .setTitle("📰 Lista komend")
    // .setDescription("``Leave`` - **Bot wychodzi z kanału**\n``Volume <liczba>`` - **Zmienia głośność**\n``Clear`` - **Usuwa aktualną playlistę**\n``Play <tytuł lub link>`` - **Odtwarza wybrany utwór**\n``Loop <off | track | queue>`` - **Włącza lub wyłącza powtarzanie**\n``Skip`` - **Rozpoczyna głosowanie na pominięcie piosenki**\n``Forceskip`` - **Pomija piosenkę**\n``Nowplaying`` - **Informacje o obecnym utworze**\n``Ping`` - **Wyświetla aktualny ping bota**\n``Pause`` - **Zatrzymuje odtwarzanie piosenki**\n``Resume`` - **Wznawia zatrzymany utwór**\n``Shuffle`` - **Przetasowuje bieżącą playlistę**\n``Queue`` - **Wyświetla listę utworów w playliście**\n``Uptime`` - **Pokazuje informacje o bocie**\n``Seek <liczba>`` -  **Zmienia pozycję odtwarzania**\n``Back`` - **Odtwarza poprzedni utwór**\n``Filters`` - **Wyświetla listę dostępnych filtrów**\n``Filters reset`` - **Resetuje wszystkie aktywne filtry**\n``Autoplay`` - **Przełącza automatyczne odtwarzanie**\n``Save`` - **Zapisuje obecny utwór i wysyła w prywatnej wiadomości**\n``Remove <liczba>`` - **Pozwala usunąć z playlisty wybrany utwór**\n``Jump <liczba>`` - **Pozwala przeskoczyć odtwarzanie na wybrany utwór**\n``Prefix <prefix>`` - **Pozwala zmienić prefix na serwerze**\n``Djset <@rola>`` - **Ustawia rolę DJ na serwerze**\n``Djremove`` - **Usuwa ustawioną rolę DJ**\n``Settings`` - **Sprawdza ustawienia dla serwera**")
    // .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
    // .setColor("Gold")

    // return message.reply({embeds: [embed]});

    let guildData = await GuildSettings.findOne({guildId: message.guild.id});
    let prefix = guildData ? guildData.prefix : process.env.PREFIX;

    switch(args[0]) {
        default:
            const embed = new EmbedBuilder()
            .setTitle(`📰 Lista komend`)
            .setDescription('**Muzyka:**\n`leave`, `volume`, `clear`, `play`, `loop`, `skip`, `nowplaying`, `pause`, `resume`, `shuffle`, `queue`, `seek`, `back`, `filters`, `autoplay`, `save`, `remove`, `jump`\n**Administracja**\n`prefix`, `djset`, `djremove`, `settings`\n**Informacje:**\n`ping`, `uptime`')
            .setFooter({text: `Wpisz "${prefix}help <nazwa komendy>", aby uzyskać informacje o wybranej komendzie`})
            .setColor('ff4d4d')

            message.reply({embeds: [embed]});
            break;
        
        case 'leave':
            const embed_leave = new EmbedBuilder()
            .setTitle(`📰 Komenda: leave`)
            .setDescription(`**Aliasy:** \`lv\`, \`leave\`\n**Permisje:** \`DJ\`\n**Użycie:** \`${prefix}leave\`\n\n**Opis:**\nBot wychodzi z aktualnego kanału głosowego`)
            .setColor('6b3deb')

            message.reply({embeds: [embed_leave]});
            break;

        case 'volume':
            const embed_volume = new EmbedBuilder()
            .setTitle(`📰 Komenda: leave`)
            .setDescription(`**Aliasy:** \`v\`, \`volume\`\n**Permisje:** \`DJ\`\n\n**${prefix}volume <1 - 200>**\nZmienia głośność słuchanej piosenki`)
            .setColor('6b3deb')
    
            message.reply({embeds: [embed_volume]});
            break;
    };
};

exports.info = {
    name: "help",
    aliases: ['h']
};