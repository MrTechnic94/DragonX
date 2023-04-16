'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (_client, message) => {

    const embed = new EmbedBuilder()
    .setTitle("📰 Lista komend")
    .setDescription("``Leave`` - **Bot wychodzi z kanału**\n``Volume <liczba>`` - **Zmienia głośność**\n``Clear`` - **Usuwa aktualną playlistę**\n``Play <tytuł lub link>`` - **Odtwarza wybrany utwór**\n``Loop <off | track | queue>`` - **Włącza lub wyłącza powtarzanie**\n``Skip`` - **Rozpoczyna głosowanie na pominięcie piosenki**\n``Forceskip`` - **Pomija piosenkę**\n``Nowplaying`` - **Informacje o obecnym utworze**\n``Ping`` - **Wyświetla aktualny ping bota**\n``Pause`` - **Zatrzymuje odtwarzanie piosenki**\n``Resume`` - **Wznawia zatrzymany utwór**\n``Shuffle`` - **Przetasowuje bieżącą playlistę**\n``Queue`` - **Wyświetla listę utworów w playliście**\n``Uptime`` - **Pokazuje informacje o bocie**\n``Seek <liczba>`` -  **Zmienia pozycję odtwarzania**\n``Back`` - **Odtwarza poprzedni utwór**\n``Filters`` - **Wyświetla listę dostępnych filtrów**\n``Filters reset`` - **Resetuje wszystkie aktywne filtry**\n``Autoplay`` - **Przełącza automatyczne odtwarzanie**\n``Save`` - **Zapisuje obecny utwór i wysyła w prywatnej wiadomości**\n``Remove <liczba>`` - **Pozwala usunąć z playlisty wybrany utwór**\n``Jump <liczba>`` - **Pozwala przeskoczyć odtwarzanie na wybrany utwór**\n``Prefix <prefix>`` - **Pozwala zmienić prefix na serwerze**\n``Djset <@rola>`` - **Ustawia rolę dj na serwerze**\n``Djremove`` - **Usuwa ustawioną rolę dj**\n``Settings`` - **Sprawdza ustawienia dla serwera**")
    .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("Gold")

    return message.reply({embeds: [embed]});

};

exports.info = {
    name: "help",
    aliases: ['h']
};